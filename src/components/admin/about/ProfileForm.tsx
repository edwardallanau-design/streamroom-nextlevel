'use client'

import { useState, useActionState } from 'react'
import { Save } from 'lucide-react'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { saveProfile, type ProfileData } from '@/lib/actions/about'

interface ProfileFormProps {
  initial: ProfileData
}

export default function ProfileForm({ initial }: ProfileFormProps) {
  const [bio, setBio] = useState(initial.bio)
  const [state, formAction, isPending] = useActionState(saveProfile, null)

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden field — carries TipTap HTML to the server action */}
      <input type="hidden" name="bio" value={bio} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1.5">
            Display Name
          </label>
          <input
            name="displayName"
            type="text"
            defaultValue={initial.displayName}
            required
            className="w-full bg-cyber-bg border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1.5">
            Tagline
          </label>
          <input
            name="tagline"
            type="text"
            defaultValue={initial.tagline}
            className="w-full bg-cyber-bg border border-cyber-border px-3 py-2 font-mono text-sm text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan transition-colors"
            placeholder="A short line about you"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1.5">
          Bio
        </label>
        <RichTextEditor
          content={bio}
          onChange={setBio}
          placeholder="Write something about yourself…"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest bg-cyber-cyan text-cyber-bg px-5 py-2 hover:bg-cyber-magenta transition-colors clip-corner-sm disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          {isPending ? 'SAVING…' : 'SAVE PROFILE'}
        </button>

        {state?.success && (
          <span className="font-mono text-xs text-cyber-green">Saved!</span>
        )}
        {state?.error && (
          <span className="font-mono text-xs text-cyber-magenta">{state.error}</span>
        )}
      </div>
    </form>
  )
}
