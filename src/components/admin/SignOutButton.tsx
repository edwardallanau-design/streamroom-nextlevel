'use client'

import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyber-muted hover:text-cyber-magenta transition-colors"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">SIGN OUT</span>
      </button>
    </form>
  )
}
