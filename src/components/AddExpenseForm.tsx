"use client"

import { useState, useRef } from 'react'
import { PlusCircle } from 'lucide-react'

const CATEGORIES = [
  { id: 'food', label: 'Food & Dining' },
  { id: 'transport', label: 'Transportation' },
  { id: 'bills', label: 'Bills & Utilities' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'others', label: 'Others' },
]

export default function AddExpenseForm({ action }: { action: (data: FormData) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await action(formData)
      formRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="premium-card p-6 lg:sticky lg:top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <PlusCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quick Add</h2>
          <p className="text-xs text-slate-500">Record a new transaction.</p>
        </div>
      </div>
      
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-wider">Amount (₱)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            required
            className="w-full px-4 py-3 text-2xl font-bold border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
            placeholder="0.00"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-wider">Category</label>
            <select
              name="category"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none bg-white transition-all text-sm font-bold text-slate-900"
              defaultValue="food"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-wider">Date</label>
            <input
              type="date"
              name="date"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm font-bold text-slate-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase px-1 tracking-wider">Note (Optional)</label>
          <input
            type="text"
            name="note"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400"
            placeholder="What was this for?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {isSubmitting ? 'Processing...' : 'Save Expense'}
        </button>
      </form>
    </div>
  )
}

