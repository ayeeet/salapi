"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, PiggyBank, TrendingUp, Wallet } from "lucide-react"

const moduleLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/modules/expenses", label: "Expense Tracker", icon: Wallet },
  { href: "/modules/savings", label: "Savings", icon: PiggyBank },
  { href: "/modules/investments", label: "Investments", icon: TrendingUp },
]

export default function ModuleSidebar() {
  const pathname = usePathname()

  return (
    <aside className="lg:col-span-1">
      <div className="premium-card p-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-4">Main Menu</p>
        <nav className="space-y-1">
          {moduleLinks.map((link) => {
            const Icon = link.icon
            const active =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  active
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

