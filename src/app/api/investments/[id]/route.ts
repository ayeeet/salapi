import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteInvestmentEntry, updateInvestmentEntry } from "@/lib/module-data"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const type = String(body.type || "")
  const amount = Number(body.amount)
  const date = String(body.date || "")
  const note = String(body.note || "")

  if (!type || !amount || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  await updateInvestmentEntry(id, session.user.id, {
    type,
    amount,
    date,
    note,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await deleteInvestmentEntry(id, session.user.id)
  return NextResponse.json({ ok: true })
}
