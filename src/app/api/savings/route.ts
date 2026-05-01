import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createSavingsEntry, listSavings } from "@/lib/module-data"
import { endOfDay, endOfMonth, endOfWeek, isWithinInterval, startOfDay, startOfMonth, startOfWeek } from "date-fns"

function inRange(date: string, filter: string | null) {
  const now = new Date()
  if (filter === "today") {
    return isWithinInterval(new Date(date), { start: startOfDay(now), end: endOfDay(now) })
  }
  if (filter === "week") {
    return isWithinInterval(new Date(date), {
      start: startOfWeek(now, { weekStartsOn: 1 }),
      end: endOfWeek(now, { weekStartsOn: 1 }),
    })
  }
  if (filter === "month") {
    return isWithinInterval(new Date(date), { start: startOfMonth(now), end: endOfMonth(now) })
  }
  return true
}

export async function GET(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const filter = new URL(request.url).searchParams.get("filter")
  const entries = await listSavings(session.user.id)
  return NextResponse.json({ entries: entries.filter((entry) => inRange(entry.date, filter)) })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const amount = Number(body.amount)
  const date = String(body.date || "")
  const note = String(body.note || "")

  if (!amount || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const id = await createSavingsEntry({
    userId: session.user.id,
    amount,
    date,
    note,
  })

  return NextResponse.json({ id }, { status: 201 })
}
