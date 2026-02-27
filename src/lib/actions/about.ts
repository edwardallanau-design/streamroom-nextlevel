'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/supabase/require-admin'

// ── Types ────────────────────────────────────────────────────────────────────

export interface ProfileData {
  displayName: string
  tagline: string
  bio: string
}

export interface LinkEntry {
  id: string
  platform: string
  label: string
  url: string
}

export interface ScheduleEntry {
  id: string
  day_of_week: number
  start_time: string
  end_time: string | null
  game: string | null
  note: string | null
  active: boolean
  created_at: string
}

type ActionState = { error?: string; success?: boolean } | null

// ── Helpers ──────────────────────────────────────────────────────────────────

function revalidate() {
  revalidatePath('/about')
  revalidatePath('/admin/about')
}

async function fetchLinks(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await supabase
    .from('site_content')
    .select('content')
    .eq('key', 'about_links')
    .single()
  try { return JSON.parse(data?.content ?? '[]') as LinkEntry[] }
  catch { return [] }
}

// ── Profile ──────────────────────────────────────────────────────────────────

export async function saveProfile(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()
  const supabase = await createClient()

  const payload: ProfileData = {
    displayName: (formData.get('displayName') as string).trim(),
    tagline:     (formData.get('tagline') as string).trim(),
    bio:         (formData.get('bio') as string),
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ key: 'about_profile', content: JSON.stringify(payload) }, { onConflict: 'key' })

  if (error) return { error: error.message }
  revalidate()
  return { success: true }
}

// ── Schedule ─────────────────────────────────────────────────────────────────

export async function addScheduleEntry(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase.from('stream_schedule').insert({
    day_of_week: parseInt(formData.get('day_of_week') as string),
    start_time:  formData.get('start_time') as string,
    end_time:    (formData.get('end_time') as string) || null,
    game:        (formData.get('game') as string).trim() || null,
    note:        (formData.get('note') as string).trim() || null,
    active:      formData.get('active') === 'true',
  })

  if (error) return { error: error.message }
  revalidate()
  return { success: true }
}

export async function updateScheduleEntry(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('stream_schedule')
    .update({
      day_of_week: parseInt(formData.get('day_of_week') as string),
      start_time:  formData.get('start_time') as string,
      end_time:    (formData.get('end_time') as string) || null,
      game:        (formData.get('game') as string).trim() || null,
      note:        (formData.get('note') as string).trim() || null,
      active:      formData.get('active') === 'true',
    })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidate()
  return { success: true }
}

export async function deleteScheduleEntry(id: string): Promise<void> {
  await requireAdmin()
  const supabase = await createClient()
  await supabase.from('stream_schedule').delete().eq('id', id)
  revalidate()
}

// ── Links ────────────────────────────────────────────────────────────────────

export async function addLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin()
  const supabase = await createClient()

  const links = await fetchLinks(supabase)
  const newLink: LinkEntry = {
    id:       crypto.randomUUID(),
    platform: formData.get('platform') as string,
    label:    (formData.get('label') as string).trim(),
    url:      (formData.get('url') as string).trim(),
  }

  const { error } = await supabase
    .from('site_content')
    .upsert(
      { key: 'about_links', content: JSON.stringify([...links, newLink]) },
      { onConflict: 'key' },
    )

  if (error) return { error: error.message }
  revalidate()
  return { success: true }
}

export async function deleteLink(linkId: string): Promise<void> {
  await requireAdmin()
  const supabase = await createClient()

  const links = await fetchLinks(supabase)
  const filtered = links.filter((l: LinkEntry) => l.id !== linkId)

  await supabase
    .from('site_content')
    .upsert({ key: 'about_links', content: JSON.stringify(filtered) }, { onConflict: 'key' })

  revalidate()
}
