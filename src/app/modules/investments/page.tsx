import ModuleSidebar from "@/components/ModuleSidebar"
import AddInvestmentForm from "@/components/AddInvestmentForm"
import InvestmentList from "@/components/InvestmentList"
import {
  addInvestmentEntry,
  deleteInvestmentEntry,
  getInvestmentTrackerData,
} from "@/app/actions"
import Link from "next/link"
import { redirect } from "next/navigation"

type SearchParams = Promise<{ range?: string }>

function parseRange(rawRange?: string): "today" | "week" | "month" {
  if (rawRange === "today" || rawRange === "week" || rawRange === "month") {
    return rawRange
  }
  return "month"
}

export default async function InvestmentsModulePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const range = parseRange((await searchParams).range)
  const data = await getInvestmentTrackerData(range)
  if (!data) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <ModuleSidebar />
          <div className="space-y-5 lg:col-span-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
              <p className="text-sm text-gray-600">Simple manual investment tracking without market integrations.</p>
            </div>

            <div className="flex items-center gap-2">
              {(["today", "week", "month"] as const).map((item) => (
                <Link
                  key={item}
                  href={`/modules/investments?range=${item}`}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${
                    data.range === item ? "bg-emerald-600 text-white" : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="text-xs text-gray-500">Total invested</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">₱{data.total.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="text-xs text-gray-500">Selected range invested</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">₱{data.rangeTotal.toLocaleString()}</p>
              </div>
            </section>

            <section className="rounded-xl border border-gray-100 bg-white p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Type breakdown</h2>
              <div className="space-y-2">
                {Object.keys(data.breakdownByType).length === 0 ? (
                  <p className="text-sm text-gray-500">No entries in this range yet.</p>
                ) : (
                  Object.entries(data.breakdownByType)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, amount]) => (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-700">{type}</span>
                        <span className="font-medium text-gray-900">₱{amount.toLocaleString()}</span>
                      </div>
                    ))
                )}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-1">
                <AddInvestmentForm action={addInvestmentEntry} />
              </div>
              <div className="lg:col-span-2">
                <InvestmentList entries={data.entries} actionDelete={deleteInvestmentEntry} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
