import { requireAdmin } from '@/lib/supabase/require-admin'

export const metadata = { title: 'About — Admin' }

export default async function AdminAboutPage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="font-mono text-lg font-bold tracking-widest text-cyber-text uppercase mb-2">
        About Page
      </h1>
      <p className="font-mono text-xs text-cyber-muted mb-8">
        Edit the content shown on your public about page.
      </p>
      <div className="border border-cyber-border bg-cyber-surface p-6 clip-corner">
        <p className="font-mono text-sm text-cyber-muted">
          About page editor coming soon.
        </p>
      </div>
    </div>
  )
}
