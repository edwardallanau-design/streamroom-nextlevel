'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, Menu, X } from 'lucide-react'

function TwitchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  )
}

const CHANNEL = process.env.NEXT_PUBLIC_TWITCH_CHANNEL ?? ''

const NAV_LINKS = [
  { href: '/',          label: 'Stream'   },
  { href: '/clips',     label: 'Clips'    },
  { href: '/schedule',  label: 'Schedule' },
  { href: '/about',     label: 'About'    },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-border bg-cyber-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <Zap className="h-5 w-5 text-cyber-cyan transition-colors group-hover:text-cyber-magenta" />
          <span className="font-mono text-base font-bold tracking-[0.2em] text-cyber-cyan glow-cyan transition-all group-hover:text-cyber-magenta group-hover:glow-magenta">
            STREAMROOM
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-sm tracking-widest text-cyber-muted transition-colors hover:text-cyber-cyan"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right — Follow on Twitch */}
        <div className="hidden md:flex items-center">
          {CHANNEL && (
            <a
              href={`https://www.twitch.tv/${CHANNEL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-1.5 transition-all hover:bg-cyber-magenta clip-corner-sm"
            >
              <TwitchIcon className="h-3.5 w-3.5" />
              FOLLOW
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cyber-cyan p-1"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cyber-border bg-cyber-surface">
          <ul className="flex flex-col gap-1 px-4 pt-4 pb-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block font-mono text-sm tracking-widest text-cyber-muted py-2 transition-colors hover:text-cyber-cyan"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          {CHANNEL && (
            <div className="px-4 pb-5 pt-2">
              <a
                href={`https://www.twitch.tv/${CHANNEL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-mono text-sm font-bold tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-2 hover:bg-cyber-magenta transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <TwitchIcon className="h-3.5 w-3.5" />
                FOLLOW ON TWITCH
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
