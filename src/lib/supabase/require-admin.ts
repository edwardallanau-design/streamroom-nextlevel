import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface AdminProfile {
  id: string
  username: string | null
  role: string
}

/**
 * Call at the top of every admin Server Component or Server Action.
 * Returns the authenticated user + profile, or redirects.
 */
export async function requireAdmin(): Promise<{ userId: string; profile: AdminProfile }> {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/admin/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, role')
    .eq('id', user.id)
    .single()

  if (profileError || profile?.role !== 'admin') {
    redirect('/')
  }

  return { userId: user.id, profile }
}
