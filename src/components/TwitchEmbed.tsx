'use client'

import { useSyncExternalStore } from 'react'
import { Radio } from 'lucide-react'

interface TwitchEmbedProps {
  channel: string
  /** When true, fills the parent container (parent must be position:relative with explicit height) */
  fill?: boolean
}

// useSyncExternalStore cleanly handles SSR (returns null) vs client (returns hostname)
// without needing useEffect + setState, which triggers cascading render warnings.
function useHostname() {
  return useSyncExternalStore<string | null>(
    _cb => () => {},                    // no external subscription needed
    () => window.location.hostname,     // client snapshot
    () => null,                         // server snapshot
  )
}

export function TwitchPlayer({ channel, fill = false }: TwitchEmbedProps) {
  const hostname = useHostname()

  const containerClass = fill
    ? 'absolute inset-0 overflow-hidden border border-cyber-border bg-cyber-surface'
    : 'relative aspect-video w-full overflow-hidden border border-cyber-border bg-cyber-surface'

  if (!hostname) {
    return (
      <div className={`flex items-center justify-center ${containerClass}`}>
        <div className="flex items-center gap-2 font-mono text-xs text-cyber-muted">
          <Radio className="h-4 w-4 animate-pulse text-cyber-cyan" />
          Loading stream...
        </div>
      </div>
    )
  }

  const src = `https://player.twitch.tv/?channel=${channel}&parent=${hostname}&autoplay=true`

  return (
    <div className={containerClass}>
      <iframe
        src={src}
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        title={`${channel}'s Twitch stream`}
      />
    </div>
  )
}

export function TwitchChat({ channel, fill = false }: TwitchEmbedProps) {
  const hostname = useHostname()

  const containerClass = fill
    ? 'absolute inset-0 overflow-hidden border-l border-cyber-border bg-cyber-surface'
    : 'relative h-full min-h-[400px] w-full overflow-hidden border border-cyber-border bg-cyber-surface'

  if (!hostname) {
    return (
      <div className={`flex items-center justify-center ${containerClass}`}>
        <span className="font-mono text-xs text-cyber-muted">Loading chat...</span>
      </div>
    )
  }

  const src = `https://www.twitch.tv/embed/${channel}/chat?parent=${hostname}&darkpopout`

  return (
    <div className={containerClass}>
      <iframe
        src={src}
        className="absolute inset-0 h-full w-full"
        title={`${channel}'s Twitch chat`}
      />
    </div>
  )
}
