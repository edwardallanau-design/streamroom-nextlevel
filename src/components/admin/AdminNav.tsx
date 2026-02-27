'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, User, Zap } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin',       label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog',  label: 'Blog',      icon: FileText },
  { href: '/admin/about', label: 'About',     icon: User },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-cyber-border bg-cyber-surface flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-cyber-border">
        <Zap className="h-4 w-4 text-cyber-cyan" />
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-cyber-cyan uppercase">
          Admin
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-0.5 px-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-widest transition-colors
                    ${active
                      ? 'text-cyber-cyan border-l-2 border-cyber-cyan pl-[10px] bg-cyber-cyan/5'
                      : 'text-cyber-muted hover:text-cyber-cyan border-l-2 border-transparent pl-[10px]'
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  {label.toUpperCase()}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Back to site */}
      <div className="px-3 pb-5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 font-mono text-xs tracking-widest text-cyber-muted hover:text-cyber-cyan border border-cyber-border hover:border-cyber-cyan/30 transition-all clip-corner-sm"
        >
          ← BACK TO SITE
        </Link>
      </div>
    </aside>
  )
}
