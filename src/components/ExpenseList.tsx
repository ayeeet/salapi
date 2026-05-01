"use client"

import { useState, useTransition } from 'react'
import { Trash2, Coffee, Bus, Zap, ShoppingBag, Film, CircleDollarSign, Pencil, X, Check, type LucideIcon } from 'lucide-react'
import { format } from 'date-fns'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  food: Coffee,
  transport: Bus,
  bills: Zap,
  shopping: ShoppingBag,
  entertainment: Film,
  others: CircleDollarSign,
}

const CATEGORY_COLORS: Record<string, string> = {
  food: 'text-orange-600 bg-orange-50 border-orange-100',
  transport: 'text-blue-600 bg-blue-50 border-blue-100',
  bills: 'text-purple-600 bg-purple-50 border-purple-100',
  shopping: 'text-pink-600 bg-pink-50 border-pink-100',
  entertainment: 'text-yellow-600 bg-yellow-50 border-yellow-100',
  others: 'text-slate-600 bg-slate-50 border-slate-100',
}

interface Expense {
  id: string
  amount: number
  category: string
  date: Date
  note: string | null
}

interface ExpenseListProps {
  expenses: Expense[]
  actionDelete: (id: string) => Promise<void>
  actionUpdate: (id: string, payload: { amount: number; category: string; date: string; note?: string }) => Promise<void>
}

export default function ExpenseList({ expenses, actionDelete, actionUpdate }: ExpenseListProps) {
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editAmount, setEditAmount] = useState("")
  const [editCategory, setEditCategory] = useState("others")
  const [editDate, setEditDate] = useState("")
  const [editNote, setEditNote] = useState("")

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id)
    setEditAmount(String(expense.amount))
    setEditCategory(expense.category)
    setEditDate(new Date(expense.date).toISOString().split("T")[0])
    setEditNote(expense.note ?? "")
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditAmount("")
    setEditCategory("others")
    setEditDate("")
    setEditNote("")
  }

  const submitEditing = () => {
    if (!editingId || !editAmount || !editDate) return
    startTransition(async () => {
      await actionUpdate(editingId, {
        amount: Number(editAmount),
        category: editCategory,
        date: editDate,
        note: editNote,
      })
      cancelEditing()
    })
  }

  if (expenses.length === 0) {
    return (
      <div className="premium-card p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
          <CircleDollarSign className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-slate-900 text-lg font-bold mb-2">No expenses yet</h3>
        <p className="text-slate-500 max-w-xs mx-auto">Start building your financial history by adding your first expense.</p>
      </div>
    )
  }

  return (
    <div className="premium-card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
      </div>
      
      <div className="divide-y divide-slate-100">
        {expenses.map((expense) => {
          const Icon = CATEGORY_ICONS[expense.category] || CircleDollarSign
          const colorClass = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.others
          const isEditing = editingId === expense.id

          return (
            <div key={expense.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 capitalize">{expense.category}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {format(new Date(expense.date), 'MMM d')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1">
                      {expense.note || "No notes provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-slate-900">
                    ₱{expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditing(expense)}
                      disabled={isPending}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                      title="Edit expense"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => startTransition(() => actionDelete(expense.id))}
                      disabled={isPending}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 space-y-4 rounded-2xl bg-slate-100/50 p-5 border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Category</label>
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      >
                        <option value="food">Food & Dining</option>
                        <option value="transport">Transportation</option>
                        <option value="bills">Bills & Utilities</option>
                        <option value="shopping">Shopping</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="others">Others</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Date</label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Note</label>
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="Add a note..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={cancelEditing}
                      className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitEditing}
                      disabled={isPending}
                      className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 disabled:opacity-50 transition-all"
                    >
                      {isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

