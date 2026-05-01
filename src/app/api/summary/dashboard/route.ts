import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { listInvestments, listSavings } from "@/lib/module-data"
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const monthStart = startOfMonth(now)
  const monthEnd = endOfMonth(now)
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)

  const [monthly, today, savings, investments] = await Promise.all([
    prisma.expense.findMany({
      where: { userId: session.user.id, date: { gte: monthStart, lte: monthEnd } },
    }),
    prisma.expense.findMany({
      where: { userId: session.user.id, date: { gte: todayStart, lte: todayEnd } },
    }),
    listSavings(session.user.id),
    listInvestments(session.user.id),
  ])

  const monthlyTotal = monthly.reduce((sum, item) => sum + item.amount, 0)
  const todayTotal = today.reduce((sum, item) => sum + item.amount, 0)

  return NextResponse.json({
    monthlyTotal,
    todayTotal,
    totalSavings: savings.reduce((sum, item) => sum + Number(item.amount), 0),
    totalInvestments: investments.reduce((sum, item) => sum + Number(item.amount), 0),
    entries: monthly.length,
  })
}
