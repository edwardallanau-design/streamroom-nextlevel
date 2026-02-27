import { Radio } from 'lucide-react'
import StreamLayout from '@/components/StreamLayout'

const CHANNEL = process.env.NEXT_PUBLIC_TWITCH_CHANNEL ?? ''

export default function HomePage() {
  if (!CHANNEL) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="border border-cyber-magenta/40 bg-cyber-surface p-8 font-mono text-sm text-cyber-muted max-w-md text-center clip-corner">
          <Radio className="mx-auto h-8 w-8 text-cyber-magenta mb-4" />
          <p className="text-cyber-text mb-2">No channel configured.</p>
          <p>
            Set <span className="text-cyber-cyan">NEXT_PUBLIC_TWITCH_CHANNEL</span> in your{' '}
            <span className="text-cyber-cyan">.env.local</span> to get started.
          </p>
        </div>
      </div>
    )
  }

  return <StreamLayout channel={CHANNEL} />
}
