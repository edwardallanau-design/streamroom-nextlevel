import { requireAdmin } from '@/lib/supabase/require-admin'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/admin/about/ProfileForm'
import ScheduleManager from '@/components/admin/about/ScheduleManager'
import LinksManager from '@/components/admin/about/LinksManager'
import { type ProfileData, type LinkEntry, type ScheduleEntry } from '@/lib/actions/about'
import { User, Calendar, Link2 } from 'lucide-react'

export const metadata = { title: 'About — Admin' }

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-cyber-border bg-cyber-surface clip-corner">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-cyber-border bg-cyber-elevated">
        <Icon className="h-4 w-4 text-cyber-cyan shrink-0" />
        <div>
          <h2 className="font-mono text-sm font-bold tracking-widest text-cyber-text uppercase">
            {title}
          </h2>
          <p className="font-mono text-xs text-cyber-muted mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default async function AdminAboutPage() {
  await requireAdmin()
  const supabase = await createClient()

  // Fetch all three data sets in parallel
  const [profileRow, linksRow, scheduleRows] = await Promise.all([
    supabase.from('site_content').select('content').eq('key', 'about_profile').single(),
    supabase.from('site_content').select('content').eq('key', 'about_links').single(),
    supabase
      .from('stream_schedule')
      .select('*')
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

  return (
    <div className="max-w-3xl space-y-6">
      <div className="mb-2">
        <h1 className="font-mono text-lg font-bold tracking-widest text-cyber-text uppercase">
          About Page
        </h1>
        <p className="font-mono text-xs text-cyber-muted mt-1">
          Manage your public profile, streaming schedule, and links.
        </p>
      </div>

      <Section
        icon={User}
        title="Profile"
        description="Your display name, tagline, and bio"
      >
        <ProfileForm initial={profile} />
      </Section>

      <Section
        icon={Calendar}
        title="Stream Schedule"
        description="When you go live — shown on your public about page"
      >
        <ScheduleManager entries={schedule} />
      </Section>

      <Section
        icon={Link2}
        title="Links"
        description="Social and streaming links shown on your about page"
      >
        <LinksManager links={links} />
      </Section>
    </div>
  )
}
