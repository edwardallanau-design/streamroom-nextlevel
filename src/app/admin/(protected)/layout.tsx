import AdminNav from '@/components/admin/AdminNav'
import SignOutButton from '@/components/admin/SignOutButton'

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-cyber-bg text-cyber-text">
      <AdminNav />

      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-cyber-border bg-cyber-surface shrink-0">
          <span className="font-mono text-xs tracking-widest text-cyber-muted uppercase">
            Control Panel
          </span>
          <SignOutButton />
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
