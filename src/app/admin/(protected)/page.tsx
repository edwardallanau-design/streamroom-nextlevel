import { requireAdmin } from '@/lib/supabase/require-admin'
import { FileText, User } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const { profile } = await requireAdmin()

  const cards = [
    {
      href:        '/admin/blog',
      label:       'Blog Posts',
      description: 'Create and manage blog content',
      icon:        FileText,
      accent:      'cyan',
    },
    {
      href:        '/admin/about',
      label:       'About Page',
      description: 'Edit your about me content',
      icon:        User,
      accent:      'magenta',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-mono text-lg font-bold tracking-widest text-cyber-text uppercase">
          Dashboard
        </h1>
        <p className="font-mono text-xs text-cyber-muted mt-1">
          Welcome back{profile.username ? `, ${profile.username}` : ''}.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {cards.map(({ href, label, description, icon: Icon, accent }) => (
          <Link
            key={href}
            href={href}
            className={`
              group block border p-5 transition-all clip-corner
              ${accent === 'cyan'
                ? 'border-cyber-cyan/20 hover:border-cyber-cyan hover:glow-box-cyan'
                : 'border-cyber-magenta/20 hover:border-cyber-magenta hover:glow-box-magenta'
              }
              bg-cyber-surface
            `}
          >
            <Icon
              className={`h-5 w-5 mb-3 ${accent === 'cyan' ? 'text-cyber-cyan' : 'text-cyber-magenta'}`}
            />
            <p className="font-mono text-sm font-bold tracking-widest text-cyber-text uppercase mb-1">
              {label}
            </p>
            <p className="font-mono text-xs text-cyber-muted">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
