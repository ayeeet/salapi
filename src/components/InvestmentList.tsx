"use client"

import { format } from "date-fns"
import { TrendingUp, Trash2 } from "lucide-react"
import { useTransition } from "react"

interface InvestmentEntry {
  id: string
  type: string
  amount: number
  date: string | Date
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
      <div className="premium-card p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
          <TrendingUp className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-slate-900 text-lg font-bold mb-2">No investment entries yet</h3>
        <p className="text-slate-500 max-w-xs mx-auto">Track your long-term growth by adding your first investment record.</p>
      </div>
    )
  }

  return (
    <div className="premium-card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Investment History</h2>
      </div>
      
      <div className="divide-y divide-slate-100">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors group flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-900 capitalize">{entry.type}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                  {format(new Date(entry.date), "MMM d, yyyy")}
                </span>
              </div>
              <p className="text-lg font-bold text-emerald-600 mt-1">
                ₱{Number(entry.amount).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">
                {entry.note || "No notes provided"}
              </p>
            </div>
            <button
              onClick={() => startTransition(() => actionDelete(entry.id))}
              disabled={isPending}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
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

