import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutGrid, LogOut, PiggyBank, TrendingUp, Wallet } from "lucide-react"
import ModuleSidebar from "@/components/ModuleSidebar"
import { getDashboardData } from "@/app/actions"
import { signOut } from "@/lib/auth"

export default async function DashboardPage() {
  const data = await getDashboardData()
  if (!data) redirect("/login")

  const cards = [
    {
      href: "/modules/expenses",
      title: "Expense Tracker",
      description: "Add, edit, and review your daily spending.",
      tone: "bg-emerald-50 border-emerald-200",
      icon: Wallet,
      status: "Core module",
    },
    {
      href: "/modules/savings",
      title: "Savings",
      description: "Add and review your savings entries.",
      tone: "bg-emerald-50 border-emerald-200",
      icon: PiggyBank,
      status: "MVP active",
    },
    {
      href: "/modules/investments",
      title: "Investment",
      description: "Track manual investments by type and amount.",
      tone: "bg-emerald-50 border-emerald-200",
      icon: TrendingUp,
      status: "MVP active",
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">Your finance control center for today.</p>
          </div>
        </div>

        <section className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="premium-card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total expenses</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.summary.totalSpent.toLocaleString()}</p>
          </div>
          <div className="premium-card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total savings</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.summary.totalSavings.toLocaleString()}</p>
          </div>
          <div className="premium-card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total investments</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.summary.totalInvestments.toLocaleString()}</p>
          </div>
          <div className="premium-card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Today spending</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₱{data.summary.todaySpent.toLocaleString()}</p>
          </div>
          <div className="premium-card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Top category</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 capitalize">{data.summary.highestCategory || "N/A"}</p>
          </div>
        </section>

        <section className="premium-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <LayoutGrid className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Modules</h2>
              <p className="text-sm text-slate-500">Quick access to your financial tools.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-emerald-200 hover:bg-emerald-50/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {card.status}
                      </span>
                    </div>
                    <h3 className="mt-4 font-bold text-slate-900 group-hover:text-emerald-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">{card.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Open Module →
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
