'use client'

import { useState } from 'react'
import { ExternalLink, MessageSquare, MessageSquareOff } from 'lucide-react'
import { TwitchPlayer, TwitchChat } from '@/components/TwitchEmbed'

interface StreamLayoutProps {
  channel: string
}

export default function StreamLayout({ channel }: StreamLayoutProps) {
  const [chatVisible, setChatVisible] = useState(true)

  return (
    <div className="w-full px-6 py-5 max-w-[2000px] mx-auto">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-cyber-magenta" />
          <span className="font-mono text-xs tracking-widest text-cyber-magenta uppercase">Live</span>
          <span className="font-mono text-xs text-cyber-muted">·</span>
          <span className="font-mono text-sm tracking-wider text-cyber-text">{channel}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setChatVisible(prev => !prev)}
            aria-label={chatVisible ? 'Hide chat' : 'Show chat'}
            title={chatVisible ? 'Hide chat' : 'Show chat'}
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 px-3 py-1.5 hover:border-cyber-cyan hover:glow-box-cyan transition-all clip-corner-sm"
          >
            {chatVisible
              ? <MessageSquareOff className="h-3.5 w-3.5" />
              : <MessageSquare    className="h-3.5 w-3.5" />
            }
            <span className="hidden sm:inline">{chatVisible ? 'HIDE CHAT' : 'SHOW CHAT'}</span>
          </button>

          <a
            href={`https://www.twitch.tv/${channel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-cyber-muted border border-cyber-border px-3 py-1.5 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-all clip-corner-sm"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">OPEN IN TWITCH</span>
          </a>
        </div>
      </div>

      {/* ── Stream + chat row ────────────────────────────────────────── */}
      <div className="flex gap-3 h-[calc(100vh-14rem)]">

        {/* Stream container */}
        <div className="relative flex-1 min-w-0 h-full border border-cyber-border bg-cyber-surface">
          <TwitchPlayer channel={channel} fill />
        </div>

        {/* Chat container — visually distinct, padded header + iframe */}
        {chatVisible && (
          <div className="flex flex-col w-80 xl:w-96 2xl:w-[420px] shrink-0 h-full border border-cyber-border bg-cyber-surface">
            {/* Chat header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-cyber-border shrink-0">
              <MessageSquare className="h-3.5 w-3.5 text-cyber-cyan" />
              <span className="font-mono text-xs tracking-widest text-cyber-muted uppercase">Stream Chat</span>
            </div>
            {/* Chat iframe fills remaining height */}
            <div className="relative flex-1 min-h-0">
              <TwitchChat channel={channel} fill />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
