import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const expenses = await prisma.expense.findMany({
      where: { userId: session.user.id },
      orderBy: { date: 'desc' }
    })

    const csvHeader = "Date,Category,Amount,Note\n"
    const csvRows = expenses.map(e => 
      `${format(new Date(e.date), 'yyyy-MM-dd')},${e.category},${e.amount},"${e.note || ''}"`
    ).join("\n")

    const csvContent = csvHeader + csvRows

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="salapi_expenses.csv"'
      }
    })
  } catch {
    return new NextResponse("Failed to export data", { status: 500 })
  }
}
