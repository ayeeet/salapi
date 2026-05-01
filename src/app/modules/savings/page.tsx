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
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <ModuleSidebar />
          <div className="space-y-5 lg:col-span-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Savings</h1>
              <p className="text-sm text-gray-600">Track your manual savings entries in one place.</p>
            </div>

            <div className="flex items-center gap-2">
              {(["today", "week", "month"] as const).map((item) => (
                <Link
                  key={item}
                  href={`/modules/savings?range=${item}`}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${
                    data.range === item ? "bg-emerald-600 text-white" : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="text-xs text-gray-500">All-time savings</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">₱{data.total.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="text-xs text-gray-500">Monthly savings</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">₱{data.monthlyTotal.toLocaleString()}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4">
                <p className="text-xs text-gray-500">Selected range total</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">₱{data.rangeTotal.toLocaleString()}</p>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
