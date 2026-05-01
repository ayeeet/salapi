import ModuleSidebar from "@/components/ModuleSidebar"
import AddSavingsForm from "@/components/AddSavingsForm"
import SavingsList from "@/components/SavingsList"
import { addSavingsEntry, deleteSavingsEntry, getSavingsTrackerData } from "@/app/actions"
import Link from "next/link"
import { redirect } from "next/navigation"

type SearchParams = Promise<{ range?: string }>

function parseRange(rawRange?: string): "today" | "week" | "month" {
  if (rawRange === "today" || rawRange === "week" || rawRange === "month") {
    return rawRange
  }
  return "month"
}

export default async function SavingsModulePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const range = parseRange((await searchParams).range)
  const data = await getSavingsTrackerData(range)
  if (!data) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <ModuleSidebar />
          <div className="space-y-8 lg:col-span-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Savings Tracker</h1>
              <p className="mt-1 text-slate-500">Monitor your manual savings and track your progress.</p>
            </div>

            <div className="flex items-center gap-2 p-1 w-fit rounded-xl bg-slate-100 border border-slate-200">
              {(["today", "week", "month"] as const).map((item) => (
                <Link
                  key={item}
                  href={`/modules/savings?range=${item}`}
                  className={`rounded-lg px-4 py-1.5 text-sm font-semibold capitalize transition-all ${
                    data.range === item 
                      ? "bg-white text-emerald-700 shadow-sm" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="premium-card p-5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">All-time savings</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.total.toLocaleString()}</p>
              </div>
              <div className="premium-card p-5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly savings</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.monthlyTotal.toLocaleString()}</p>
              </div>
              <div className="premium-card p-5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Selected range</p>
                <p className="mt-2 text-2xl font-bold text-emerald-600">₱{data.rangeTotal.toLocaleString()}</p>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <AddSavingsForm action={addSavingsEntry} />
              </div>
              <div className="lg:col-span-2">
                <SavingsList entries={data.entries} actionDelete={deleteSavingsEntry} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
