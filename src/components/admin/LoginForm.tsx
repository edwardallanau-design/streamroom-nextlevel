'use client'

import { useActionState } from 'react'
import { Zap, LogIn } from 'lucide-react'
import { signIn } from '@/lib/actions/auth'

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-cyber-bg px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Zap className="h-5 w-5 text-cyber-cyan" />
          <span className="font-mono text-base font-bold tracking-[0.2em] text-cyber-cyan glow-cyan uppercase">
            StreamRoom
          </span>
        </div>

        {/* Card */}
        <div className="border border-cyber-border bg-cyber-surface p-8 clip-corner">
          <h1 className="font-mono text-sm font-bold tracking-widest text-cyber-text uppercase mb-6">
            Admin Login
          </h1>

          <form action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full bg-cyber-bg border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-cyber-bg border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan transition-colors"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p className="font-mono text-xs text-cyber-magenta border border-cyber-magenta/30 px-3 py-2">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 font-mono text-sm font-bold tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-2.5 hover:bg-cyber-magenta transition-colors clip-corner-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <LogIn className="h-4 w-4" />
              {isPending ? 'SIGNING IN…' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
