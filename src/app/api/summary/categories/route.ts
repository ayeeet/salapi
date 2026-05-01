import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { endOfMonth, startOfMonth } from "date-fns"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const expenses = await prisma.expense.findMany({
    where: {
      userId: session.user.id,
      date: { gte: startOfMonth(now), lte: endOfMonth(now) },
    },
  })

  const total = expenses.reduce((sum, item) => sum + item.amount, 0)
  const categories = Object.entries(
    expenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})
  ).map(([category, amount]) => ({
    category,
    amount,
    percentage: total > 0 ? Number(((amount / total) * 100).toFixed(1)) : 0,
  }))

  return NextResponse.json({ categories, total })
}
