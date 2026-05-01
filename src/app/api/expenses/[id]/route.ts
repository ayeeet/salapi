import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const amount = Number(body.amount)
    const category = typeof body.category === "string" ? body.category : ""
    const date = typeof body.date === "string" ? body.date : ""
    const note = typeof body.note === "string" ? body.note : ""

    if (!amount || !category || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updated = await prisma.expense.updateMany({
      where: { id, userId: session.user.id },
      data: {
        amount,
        category,
        date: new Date(date),
        note: note || null,
      },
    })

    if (updated.count === 0) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Failed to update expense" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const deleted = await prisma.expense.deleteMany({
      where: { id, userId: session.user.id },
    })

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Expense deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 })
  }
}
