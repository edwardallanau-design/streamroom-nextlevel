'use client'

import { useState, useActionState } from 'react'
import { Plus, Trash2, X, Check } from 'lucide-react'
import { addLink, deleteLink, type LinkEntry } from '@/lib/actions/about'

// ── Platform icon map ─────────────────────────────────────────────────────────

export const PLATFORMS = [
  { value: 'twitch',    label: 'Twitch'    },
  { value: 'youtube',   label: 'YouTube'   },
  { value: 'twitter',   label: 'Twitter/X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'discord',   label: 'Discord'   },
  { value: 'github',    label: 'GitHub'    },
  { value: 'tiktok',    label: 'TikTok'    },
  { value: 'facebook',  label: 'Facebook'  },
  { value: 'website',   label: 'Website'   },
]

export function PlatformIcon({ platform, className = 'h-4 w-4' }: { platform: string; className?: string }) {
  switch (platform) {
    case 'twitch':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>
    case 'youtube':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    case 'twitter':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    case 'instagram':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
    case 'discord':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
    case 'github':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    case 'tiktok':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
    case 'facebook':
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    default:
      return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  }
}

// ── Add link form ─────────────────────────────────────────────────────────────

function AddLinkForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, isPending] = useActionState(addLink, null)
  if (state?.success) { onDone() }

  return (
    <form action={formAction} className="border border-cyber-cyan/30 bg-cyber-elevated p-4 mt-4">
      <p className="font-mono text-xs tracking-widest text-cyber-cyan uppercase mb-3">New Link</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Platform</label>
          <select
            name="platform"
            required
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text focus:outline-none focus:border-cyber-cyan"
          >
            {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Label</label>
          <input
            name="label"
            type="text"
            required
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan"
            placeholder="e.g. Watch me live"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">URL</label>
          <input
            name="url"
            type="url"
            required
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan"
            placeholder="https://…"
          />
        </div>
      </div>
      {state?.error && <p className="font-mono text-xs text-cyber-magenta mt-2">{state.error}</p>}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={isPending} className="flex items-center gap-1.5 font-mono text-xs tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-1.5 hover:bg-cyber-magenta transition-colors clip-corner-sm disabled:opacity-50">
          <Check className="h-3 w-3" /> {isPending ? 'SAVING…' : 'ADD'}
        </button>
        <button type="button" onClick={onDone} className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-cyber-muted border border-cyber-border px-4 py-1.5 hover:text-cyber-cyan transition-colors clip-corner-sm">
          <X className="h-3 w-3" /> CANCEL
        </button>
      </div>
    </form>
  )
}

// ── Main manager ──────────────────────────────────────────────────────────────

export default function LinksManager({ links }: { links: LinkEntry[] }) {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div>
      {links.length === 0 && !showAdd && (
        <p className="font-mono text-xs text-cyber-muted mb-4">No links added yet.</p>
      )}

      {links.length > 0 && (
        <div className="space-y-2 mb-4">
          {links.map(link => (
            <div
              key={link.id}
              className="flex items-center gap-3 border border-cyber-border bg-cyber-elevated px-3 py-2.5"
            >
              <PlatformIcon platform={link.platform} className="h-4 w-4 text-cyber-cyan shrink-0" />
              <span className="font-mono text-xs text-cyber-text flex-1">{link.label}</span>
              <span className="font-mono text-xs text-cyber-muted truncate max-w-[200px] hidden sm:block">{link.url}</span>
              <button
                onClick={() => deleteLink(link.id)}
                className="flex items-center gap-1 font-mono text-xs text-cyber-muted hover:text-cyber-magenta transition-colors shrink-0 ml-2"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showAdd && (
        <AddLinkForm onDone={() => setShowAdd(false)} />
      )}

      {!showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 px-4 py-2 hover:border-cyber-cyan hover:glow-box-cyan transition-all clip-corner-sm"
        >
          <Plus className="h-3.5 w-3.5" /> ADD LINK
        </button>
      )}
    </div>
  )
}
