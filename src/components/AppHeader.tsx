"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Wallet, PiggyBank, TrendingUp, LogOut, User } from "lucide-react"
import { logout } from "@/app/actions"

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/modules/expenses", label: "Expenses", icon: Wallet },
  { href: "/modules/savings", label: "Savings", icon: PiggyBank },
  { href: "/modules/investments", label: "Investments", icon: TrendingUp },
]

export default function AppHeader({ user }: { user?: { email?: string | null } }) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <span className="text-lg font-bold">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Salapi</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-slate-50 pl-1 pr-3 py-1 border border-slate-200">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-medium text-slate-600">{user.email}</span>
              </div>
            )}
            
            <form action={logout}>
              <button 
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <nav className="flex md:hidden items-center justify-around border-t border-slate-100 bg-white p-2">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${
                active ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

