import { prisma } from "@/lib/prisma"

export async function listSavings(userId: string) {
  try {
    return await prisma.savings.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })
  } catch (error) {
    console.error("Error fetching savings:", error)
    return []
  }
}

export async function createSavingsEntry(input: {
  userId: string
  amount: number
  date: string
  note?: string
}) {
  const id = crypto.randomUUID()
  await prisma.savings.create({
    data: {
      id,
      amount: input.amount,
      date: new Date(input.date),
      note: input.note?.trim() || null,
      userId: input.userId,
    },
  })
  return id
}

export async function updateSavingsEntry(
  id: string,
  userId: string,
  payload: { amount: number; date: string; note?: string }
) {
  await prisma.savings.updateMany({
    where: { id, userId },
    data: {
      amount: payload.amount,
      date: new Date(payload.date),
      note: payload.note?.trim() || null,
    },
  })
}

export async function deleteSavingsEntry(id: string, userId: string) {
  await prisma.savings.deleteMany({
    where: { id, userId },
  })
}

export async function listInvestments(userId: string) {
  try {
    return await prisma.investment.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })
  } catch (error) {
    console.error("Error fetching investments:", error)
    return []
  }
}

export async function createInvestmentEntry(input: {
  userId: string
  type: string
  amount: number
  date: string
  note?: string
}) {
  const id = crypto.randomUUID()
  await prisma.investment.create({
    data: {
      id,
      type: input.type,
      amount: input.amount,
      date: new Date(input.date),
      note: input.note?.trim() || null,
      userId: input.userId,
    },
  })
  return id
}

export async function updateInvestmentEntry(
  id: string,
  userId: string,
  payload: { type: string; amount: number; date: string; note?: string }
) {
  await prisma.investment.updateMany({
    where: { id, userId },
    data: {
      type: payload.type,
      amount: payload.amount,
      date: new Date(payload.date),
      note: payload.note?.trim() || null,
    },
  })
}

export async function deleteInvestmentEntry(id: string, userId: string) {
  await prisma.investment.deleteMany({
    where: { id, userId },
  })
}
