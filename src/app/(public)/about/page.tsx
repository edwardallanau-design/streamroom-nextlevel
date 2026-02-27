import DOMPurify from 'isomorphic-dompurify'
import { createClient } from '@/lib/supabase/server'
import { PlatformIcon, PLATFORMS } from '@/components/admin/about/LinksManager'
import { type ProfileData, type LinkEntry, type ScheduleEntry } from '@/lib/actions/about'

export const metadata = { title: 'About' }

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function fmt12(t: string | null) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${((h % 12) || 12)}:${String(m).padStart(2, '0')} ${ampm}`
}

function getPlatformLabel(value: string) {
  return PLATFORMS.find(p => p.value === value)?.label ?? value
}

export default async function AboutPage() {
  const supabase = await createClient()

  const [profileRow, linksRow, scheduleRows] = await Promise.all([
    supabase.from('site_content').select('content').eq('key', 'about_profile').single(),
    supabase.from('site_content').select('content').eq('key', 'about_links').single(),
    supabase
      .from('stream_schedule')
      .select('*')
      .eq('active', true)
      .order('day_of_week')
      .order('start_time'),
  ])

  const profile: ProfileData = (() => {
    try { return JSON.parse(profileRow.data?.content ?? '{}') }
    catch { return { displayName: '', tagline: '', bio: '' } }
  })()

  const links: LinkEntry[] = (() => {
    try { return JSON.parse(linksRow.data?.content ?? '[]') }
    catch { return [] }
  })()

  const schedule = (scheduleRows.data ?? []) as ScheduleEntry[]

  const cleanBio = DOMPurify.sanitize(profile.bio ?? '', {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's',
      'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
      'blockquote', 'pre', 'code', 'a', 'hr',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  })

  return (
    <div className="min-h-[80vh] px-6 py-12 max-w-3xl mx-auto">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block h-2 w-2 rounded-full bg-cyber-cyan" />
          <span className="font-mono text-xs tracking-widest text-cyber-muted uppercase">About</span>
        </div>
        <h1 className="font-mono text-4xl font-bold tracking-wider text-cyber-cyan glow-cyan mb-2">
          {profile.displayName || 'Stream Room'}
        </h1>
        {profile.tagline && (
          <p className="font-mono text-sm text-cyber-muted tracking-wide">{profile.tagline}</p>
        )}
      </div>

      {/* ── Bio ──────────────────────────────────────────────────────── */}
      {cleanBio && (
        <div className="mb-12 border-l-2 border-cyber-cyan/30 pl-6">
          <article
            className="prose-about text-cyber-text text-sm leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: cleanBio }}
          />
        </div>
      )}

      {/* ── Links ────────────────────────────────────────────────────── */}
      {links.length > 0 && (
        <div className="mb-12">
          <h2 className="font-mono text-xs tracking-widest text-cyber-muted uppercase mb-4">Links</h2>
          <div className="flex flex-wrap gap-2">
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 px-3 py-2 hover:border-cyber-cyan hover:glow-box-cyan transition-all clip-corner-sm"
                title={getPlatformLabel(link.platform)}
              >
                <PlatformIcon platform={link.platform} className="h-3.5 w-3.5" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Stream Schedule ───────────────────────────────────────────── */}
      {schedule.length > 0 && (
        <div>
          <h2 className="font-mono text-xs tracking-widest text-cyber-muted uppercase mb-4">
            Stream Schedule
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {schedule.map(entry => (
              <div
                key={entry.id}
                className="border border-cyber-border bg-cyber-surface p-4 clip-corner-sm"
              >
                <p className="font-mono text-xs font-bold tracking-widest text-cyber-cyan uppercase mb-1">
                  {DAYS[entry.day_of_week]}
                </p>
                <p className="font-mono text-sm text-cyber-text">
                  {fmt12(entry.start_time)}
                  {entry.end_time && <span className="text-cyber-muted"> – {fmt12(entry.end_time)}</span>}
                </p>
                {entry.game && (
                  <p className="font-mono text-xs text-cyber-muted mt-1">{entry.game}</p>
                )}
                {entry.note && (
                  <p className="font-mono text-xs text-cyber-muted italic mt-0.5">{entry.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!cleanBio && links.length === 0 && schedule.length === 0 && (
        <div className="border border-cyber-border bg-cyber-surface p-8 text-center clip-corner">
          <p className="font-mono text-sm text-cyber-muted">About page coming soon.</p>
        </div>
      )}
    </div>
  )
}
