"use client"

import { format } from "date-fns"
import { CircleDollarSign, Trash2 } from "lucide-react"
import { useTransition } from "react"

interface InvestmentEntry {
  id: string
  type: string
  amount: number
  date: string
  note: string | null
}

export default function InvestmentList({
  entries,
  actionDelete,
}: {
  entries: InvestmentEntry[]
  actionDelete: (id: string) => Promise<void>
}) {
  const [isPending, startTransition] = useTransition()

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center min-h-[240px] flex flex-col justify-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
          <CircleDollarSign className="h-6 w-6 text-gray-400" />
        </div>
        <p className="font-medium text-gray-800">No investment entries yet.</p>
        <p className="text-sm text-gray-500">Add your first manual investment record.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-lg font-bold text-gray-800">Investment History</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {entries.map((entry) => (
          <div key={entry.id} className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 capitalize">
                {entry.type} • ₱
                {Number(entry.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(entry.date), "MMM d, yyyy")}
                {entry.note ? ` • ${entry.note}` : ""}
              </p>
            </div>
            <button
              onClick={() => startTransition(() => actionDelete(entry.id))}
              disabled={isPending}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete entry"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
