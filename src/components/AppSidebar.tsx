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

export default function AppSidebar({ user }: { user?: { email?: string | null } }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-slate-200 bg-white p-6 z-50">
        <div className="flex flex-col h-full">
          <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <span className="text-xl font-bold">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Salapi</span>
          </Link>

          <nav className="flex-1 space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all ${
                    active 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
            {user && (
              <div className="flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">{user.email}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Free Plan</span>
                </div>
              </div>
            )}
            
            <form action={logout}>
              <button 
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-100"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white/90 backdrop-blur-lg px-2 py-3 safe-area-pb">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-all ${
                active ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? "fill-emerald-50" : ""}`} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
