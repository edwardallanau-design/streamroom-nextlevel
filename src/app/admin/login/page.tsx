import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from '@/components/admin/LoginForm'

export const metadata = { title: 'Login' }

export default async function LoginPage() {
  // Redirect already-authenticated admins straight to the panel
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role === 'admin') redirect('/admin')
  }

  return <LoginForm />
}
