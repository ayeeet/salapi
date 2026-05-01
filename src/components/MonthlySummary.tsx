import { TrendingUp, AlertCircle } from 'lucide-react'

interface MonthlySummaryProps {
  totalSpent: number
  budgetLimit: number
  percentageUsed: number
  highestCategory: string
  insight: string
}

export default function MonthlySummary({
  totalSpent,
  budgetLimit,
  percentageUsed,
  insight,
}: MonthlySummaryProps) {
  const isOverBudget = totalSpent > budgetLimit

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Overview</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Spent</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-extrabold text-gray-900">
              ₱{totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-sm text-gray-400 mb-1">/ ₱{budgetLimit.toLocaleString()}</span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">Budget Usage</span>
              <span className={`font-bold ${isOverBudget ? 'text-red-500' : 'text-emerald-500'}`}>
                {percentageUsed.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            {isOverBudget ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <TrendingUp className="w-5 h-5 text-blue-500" />
            )}
            <h3 className="font-semibold text-gray-700">Insights</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  )
}
