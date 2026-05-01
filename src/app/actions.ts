"use server"

import { auth, signOut } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  createInvestmentEntry,
  createSavingsEntry,
  deleteInvestmentEntry as deleteInvestmentEntryRecord,
  deleteSavingsEntry as deleteSavingsEntryRecord,
  listInvestments,
  listSavings,
  updateInvestmentEntry as updateInvestmentEntryRecord,
  updateSavingsEntry as updateSavingsEntryRecord,
} from "@/lib/module-data"
import { revalidatePath } from "next/cache"

export async function logout() {
  await signOut({ redirectTo: "/login" })
}

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns"

type ExpenseRange = "today" | "week" | "month"

function resolveRange(range: ExpenseRange) {
  const now = new Date()

  if (range === "today") {
    return { start: startOfDay(now), end: endOfDay(now) }
  }

  if (range === "week") {
    return {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    }
  }

  return { start: startOfMonth(now), end: endOfMonth(now) }
}

export async function addExpense(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const amount = parseFloat(formData.get("amount") as string)
  const category = formData.get("category") as string
  const date = formData.get("date") as string
  const note = formData.get("note") as string

  await prisma.expense.create({
    data: {
      amount,
      category,
      date: new Date(date),
      note,
      userId: session.user.id,
    },
  })

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (user) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null
    if (lastLogin) lastLogin.setHours(0, 0, 0, 0)

    if (!lastLogin || lastLogin.getTime() !== today.getTime()) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          streakCount: { increment: 1 },
          lastLoginDate: new Date(),
        },
      })
    }
  }

  revalidatePath("/dashboard")
  revalidatePath("/modules/expenses")
}

export async function deleteExpense(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.expense.deleteMany({
    where: { id, userId: session.user.id },
  })

  revalidatePath("/dashboard")
  revalidatePath("/modules/expenses")
}

export async function updateExpense(
  id: string,
  payload: { amount: number; category: string; date: string; note?: string }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.expense.updateMany({
    where: { id, userId: session.user.id },
    data: {
      amount: payload.amount,
      category: payload.category,
      date: new Date(payload.date),
      note: payload.note?.trim() || null,
    },
  })

  revalidatePath("/dashboard")
  revalidatePath("/modules/expenses")
}

export async function getDashboardData() {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      expenses: {
        orderBy: { date: "desc" },
      },
    },
  })

  if (!user) return null

  const todayRange = resolveRange("today")
  const monthRange = resolveRange("month")

  const monthlyExpenses = user.expenses.filter(
    (expense: any) =>
      isWithinInterval(new Date(expense.date), {
        start: monthRange.start,
        end: monthRange.end,
      })
  )
  const todaysExpenses = user.expenses.filter(
    (expense: any) =>
      isWithinInterval(new Date(expense.date), {
        start: todayRange.start,
        end: todayRange.end,
      })
  )

  const totalSpent = monthlyExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
  const todaySpent = todaysExpenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)

  const categoryTotals = monthlyExpenses.reduce((acc: Record<string, number>, exp: any) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount
    return acc
  }, {})

  let highestCategory = ""
  let highestAmount = 0
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if ((amt as number) > highestAmount) {
      highestAmount = amt as number
      highestCategory = cat
    }
  }

  let insight = "You are on track!"
  if (totalSpent > user.monthlyBudget && user.monthlyBudget > 0) {
    insight = "You have exceeded your monthly budget!"
  } else if (highestCategory) {
    insight = `You spent the most on ${highestCategory} (₱${highestAmount}).`
  } else if (totalSpent === 0) {
    insight = "No expenses recorded yet for this month."
  }

  const [allSavings, allInvestments] = await Promise.all([
    listSavings(session.user.id),
    listInvestments(session.user.id),
  ])

  return {
    user: {
      email: user.email,
      monthlyBudget: user.monthlyBudget,
      streakCount: user.streakCount,
    },
    expenses: user.expenses.slice(0, 5),
    summary: {
      totalSpent,
      todaySpent,
      totalSavings: allSavings.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
      totalInvestments: allInvestments.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
      percentageUsed: user.monthlyBudget > 0 ? Math.min((totalSpent / user.monthlyBudget) * 100, 100) : 0,
      highestCategory,
      insight,
    },
    categoryTotals,
  }
}

export async function getExpenseTrackerData(range: ExpenseRange) {
  const session = await auth()
  if (!session?.user?.id) return null

  const allExpenses = await prisma.expense.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  })

  const { start, end } = resolveRange(range)
  const filteredExpenses = allExpenses.filter((expense: any) =>
    isWithinInterval(new Date(expense.date), { start, end })
  )

  const categoryTotals = filteredExpenses.reduce<Record<string, number>>((acc, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {})

  return {
    range,
    expenses: filteredExpenses,
    total: filteredExpenses.reduce((sum: number, expense: any) => sum + expense.amount, 0),
    categoryTotals,
  }
}

export async function addSavingsEntry(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const amount = Number(formData.get("amount"))
  const date = String(formData.get("date") || "")
  const note = String(formData.get("note") || "")

  if (!amount || !date) throw new Error("Invalid input")

  await createSavingsEntry({
    userId: session.user.id,
    amount,
    date,
    note,
  })

  revalidatePath("/dashboard")
  revalidatePath("/modules/savings")
}

export async function updateSavingsEntry(
  id: string,
  payload: { amount: number; date: string; note?: string }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await updateSavingsEntryRecord(id, session.user.id, payload)

  revalidatePath("/dashboard")
  revalidatePath("/modules/savings")
}

export async function deleteSavingsEntry(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await deleteSavingsEntryRecord(id, session.user.id)

  revalidatePath("/dashboard")
  revalidatePath("/modules/savings")
}

export async function getSavingsTrackerData(range: ExpenseRange) {
  const session = await auth()
  if (!session?.user?.id) return null

  const allEntries = await listSavings(session.user.id)
  const { start, end } = resolveRange(range)
  const filteredEntries = allEntries.filter((entry) =>
    isWithinInterval(new Date(entry.date), { start, end })
  )

  const now = new Date()
  const monthlyTotal = allEntries
    .filter((entry) =>
      isWithinInterval(new Date(entry.date), {
        start: startOfMonth(now),
        end: endOfMonth(now),
      })
    )
    .reduce((sum, entry) => sum + Number(entry.amount), 0)

  return {
    range,
    entries: filteredEntries,
    total: allEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
    monthlyTotal,
    rangeTotal: filteredEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
  }
}

export async function addInvestmentEntry(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const type = String(formData.get("type") || "")
  const amount = Number(formData.get("amount"))
  const date = String(formData.get("date") || "")
  const note = String(formData.get("note") || "")

  if (!type || !amount || !date) throw new Error("Invalid input")

  await createInvestmentEntry({
    userId: session.user.id,
    type,
    amount,
    date,
    note,
  })

  revalidatePath("/dashboard")
  revalidatePath("/modules/investments")
}

export async function updateInvestmentEntry(
  id: string,
  payload: { type: string; amount: number; date: string; note?: string }
) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await updateInvestmentEntryRecord(id, session.user.id, payload)

  revalidatePath("/dashboard")
  revalidatePath("/modules/investments")
}

export async function deleteInvestmentEntry(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await deleteInvestmentEntryRecord(id, session.user.id)

  revalidatePath("/dashboard")
  revalidatePath("/modules/investments")
}

export async function getInvestmentTrackerData(range: ExpenseRange) {
  const session = await auth()
  if (!session?.user?.id) return null

  const allEntries = await listInvestments(session.user.id)
  const { start, end } = resolveRange(range)
  const filteredEntries = allEntries.filter((entry) =>
    isWithinInterval(new Date(entry.date), { start, end })
  )

  const breakdownByType = filteredEntries.reduce<Record<string, number>>((acc, entry: any) => {
    const key = entry.type.toLowerCase()
    acc[key] = (acc[key] || 0) + Number(entry.amount)
    return acc
  }, {})

  return {
    range,
    entries: filteredEntries,
    total: allEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
    rangeTotal: filteredEntries.reduce((sum: number, entry: any) => sum + Number(entry.amount), 0),
    breakdownByType,
  }
}
