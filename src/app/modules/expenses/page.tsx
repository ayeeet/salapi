import Link from "next/link"
import { redirect } from "next/navigation"
import { addExpense, deleteExpense, getExpenseTrackerData, updateExpense } from "@/app/actions"
import AddExpenseForm from "@/components/AddExpenseForm"
import ExpenseList from "@/components/ExpenseList"
import ModuleSidebar from "@/components/ModuleSidebar"

type SearchParams = Promise<{ range?: string }>

function parseRange(rawRange?: string): "today" | "week" | "month" {
  if (rawRange === "today" || rawRange === "week" || rawRange === "month") {
    return rawRange
  }
  return "month"
}

export default async function ExpenseModulePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const selectedRange = parseRange((await searchParams).range)
  const data = await getExpenseTrackerData(selectedRange)

  if (!data) {
    redirect("/login")
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Expense Tracker</h1>
          <p className="mt-1 text-slate-500">Manage your daily spending with precision.</p>
        </div>

        <div className="flex items-center gap-2 p-1 w-fit rounded-xl bg-slate-100 border border-slate-200">
          {(["today", "week", "month"] as const).map((range) => (
            <Link
              key={range}
              href={`/modules/expenses?range=${range}`}
              className={`rounded-lg px-4 py-1.5 text-sm font-semibold capitalize transition-all ${
                data.range === range 
                  ? "bg-white text-emerald-700 shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {range}
            </Link>
          ))}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="premium-card p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Selected range total</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">₱{data.total.toLocaleString()}</p>
          </div>
          <div className="premium-card p-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Entries</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{data.expenses.length}</p>
          </div>
        </section>

        <section className="premium-card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Category breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.keys(data.categoryTotals).length === 0 ? (
              <p className="text-sm text-slate-500 col-span-full">No expenses in this range yet.</p>
            ) : (
              Object.entries(data.categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount]) => (
                  <div key={category} className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="block text-xs font-medium text-slate-500 uppercase tracking-tight mb-1 truncate">{category}</span>
                    <span className="block text-lg font-bold text-emerald-700 truncate">₱{amount.toLocaleString()}</span>
                  </div>
                ))
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1">
            <AddExpenseForm action={addExpense} />
          </div>
          <div className="lg:col-span-2">
            <ExpenseList expenses={data.expenses} actionDelete={deleteExpense} actionUpdate={updateExpense} />
          </div>
        </div>
      </div>
    </main>
  )
}
