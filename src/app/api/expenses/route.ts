import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { endOfDay, endOfMonth, endOfWeek, startOfDay, startOfMonth, startOfWeek } from "date-fns"

function buildRange(filter: string | null) {
  const now = new Date()
  if (filter === "today") {
    return { gte: startOfDay(now), lte: endOfDay(now) }
  }
  if (filter === "week") {
    return {
      gte: startOfWeek(now, { weekStartsOn: 1 }),
      lte: endOfWeek(now, { weekStartsOn: 1 }),
    }
  }
  return { gte: startOfMonth(now), lte: endOfMonth(now) }
}

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const filter = url.searchParams.get("filter")
  const dateRange = buildRange(filter)

  const expenses = await prisma.expense.findMany({
    where: {
      userId: session.user.id,
      date: dateRange,
    },
    orderBy: { date: "desc" },
  })

  return NextResponse.json({ expenses })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const amount = Number(body.amount)
    const category = typeof body.category === "string" ? body.category : ""
    const date = typeof body.date === "string" ? body.date : ""
    const note = typeof body.note === "string" ? body.note : ""

    if (!amount || !category || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const expense = await prisma.expense.create({
      data: {
        amount,
        category,
        date: new Date(date),
        note: note || null,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ expense }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
