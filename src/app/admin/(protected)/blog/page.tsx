import { requireAdmin } from '@/lib/supabase/require-admin'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, PenLine, Eye, EyeOff } from 'lucide-react'

export const metadata = { title: 'Blog — Admin' }

export default async function AdminBlogPage() {
  await requireAdmin()

  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, published, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-mono text-lg font-bold tracking-widest text-cyber-text uppercase">
            Blog Posts
          </h1>
          <p className="font-mono text-xs text-cyber-muted mt-1">
            {posts?.length ?? 0} post{posts?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-2 hover:bg-cyber-magenta transition-colors clip-corner-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          NEW POST
        </Link>
      </div>

      {!posts?.length ? (
        <div className="border border-cyber-border bg-cyber-surface p-10 text-center clip-corner">
          <p className="font-mono text-sm text-cyber-muted">No posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="inline-block mt-4 font-mono text-xs text-cyber-cyan hover:text-cyber-magenta transition-colors"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="border border-cyber-border bg-cyber-surface overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left font-mono text-xs tracking-widest text-cyber-muted uppercase px-4 py-3">Title</th>
                <th className="text-left font-mono text-xs tracking-widest text-cyber-muted uppercase px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="text-left font-mono text-xs tracking-widest text-cyber-muted uppercase px-4 py-3 hidden md:table-cell">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-b border-cyber-border last:border-0 hover:bg-cyber-elevated transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-cyber-text">{post.title}</span>
                    <span className="block font-mono text-xs text-cyber-muted mt-0.5">/{post.slug}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${post.published ? 'text-cyber-green' : 'text-cyber-muted'}`}>
                      {post.published
                        ? <><Eye className="h-3 w-3" /> Published</>
                        : <><EyeOff className="h-3 w-3" /> Draft</>
                      }
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-cyber-muted">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-cyber-cyan hover:text-cyber-magenta transition-colors"
                    >
                      <PenLine className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
