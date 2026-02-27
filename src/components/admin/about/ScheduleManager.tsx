'use client'

import { useState, useActionState } from 'react'
import { Plus, PenLine, Trash2, X, Check } from 'lucide-react'
import {
  addScheduleEntry,
  updateScheduleEntry,
  deleteScheduleEntry,
  type ScheduleEntry,
} from '@/lib/actions/about'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function fmt12(t: string | null) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${((h % 12) || 12)}:${String(m).padStart(2, '0')} ${ampm}`
}

// ── Shared form fields ────────────────────────────────────────────────────────

function ScheduleFields({ entry }: { entry?: ScheduleEntry }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Day</label>
          <select
            name="day_of_week"
            defaultValue={entry?.day_of_week ?? 1}
            required
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text focus:outline-none focus:border-cyber-cyan"
          >
            {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Start</label>
          <input
            name="start_time"
            type="time"
            defaultValue={entry?.start_time ?? '20:00'}
            required
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">End</label>
          <input
            name="end_time"
            type="time"
            defaultValue={entry?.end_time ?? ''}
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Active</label>
          <select
            name="active"
            defaultValue={entry?.active !== false ? 'true' : 'false'}
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text focus:outline-none focus:border-cyber-cyan"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Game / Content</label>
          <input
            name="game"
            type="text"
            defaultValue={entry?.game ?? ''}
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan"
            placeholder="e.g. FPS, Variety, Chill"
          />
        </div>
        <div>
          <label className="block font-mono text-xs tracking-widest text-cyber-muted uppercase mb-1">Note</label>
          <input
            name="note"
            type="text"
            defaultValue={entry?.note ?? ''}
            className="w-full bg-cyber-bg border border-cyber-border px-2 py-1.5 font-mono text-xs text-cyber-text placeholder:text-cyber-muted focus:outline-none focus:border-cyber-cyan"
            placeholder="Optional note"
          />
        </div>
      </div>
    </>
  )
}

// ── Add form ──────────────────────────────────────────────────────────────────

function AddEntryForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, isPending] = useActionState(addScheduleEntry, null)

  if (state?.success) { onDone() }

  return (
    <form action={formAction} className="border border-cyber-cyan/30 bg-cyber-elevated p-4 mt-4">
      <p className="font-mono text-xs tracking-widest text-cyber-cyan uppercase mb-3">New Entry</p>
      <ScheduleFields />
      {state?.error && <p className="font-mono text-xs text-cyber-magenta mt-2">{state.error}</p>}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={isPending} className="flex items-center gap-1.5 font-mono text-xs tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-1.5 hover:bg-cyber-magenta transition-colors clip-corner-sm disabled:opacity-50">
          <Check className="h-3 w-3" /> {isPending ? 'SAVING…' : 'ADD'}
        </button>
        <button type="button" onClick={onDone} className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-cyber-muted border border-cyber-border px-4 py-1.5 hover:text-cyber-cyan transition-colors clip-corner-sm">
          <X className="h-3 w-3" /> CANCEL
        </button>
      </div>
    </form>
  )
}

// ── Edit form (inline row replacement) ───────────────────────────────────────

function EditEntryForm({ entry, onDone }: { entry: ScheduleEntry; onDone: () => void }) {
  const action = updateScheduleEntry.bind(null, entry.id)
  const [state, formAction, isPending] = useActionState(action, null)

  if (state?.success) { onDone() }

  return (
    <form action={formAction} className="border border-cyber-yellow/30 bg-cyber-elevated p-4">
      <p className="font-mono text-xs tracking-widest text-cyber-yellow uppercase mb-3">Editing Entry</p>
      <ScheduleFields entry={entry} />
      {state?.error && <p className="font-mono text-xs text-cyber-magenta mt-2">{state.error}</p>}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={isPending} className="flex items-center gap-1.5 font-mono text-xs tracking-widest bg-cyber-cyan text-cyber-bg px-4 py-1.5 hover:bg-cyber-magenta transition-colors clip-corner-sm disabled:opacity-50">
          <Check className="h-3 w-3" /> {isPending ? 'SAVING…' : 'SAVE'}
        </button>
        <button type="button" onClick={onDone} className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-cyber-muted border border-cyber-border px-4 py-1.5 hover:text-cyber-cyan transition-colors clip-corner-sm">
          <X className="h-3 w-3" /> CANCEL
        </button>
      </div>
    </form>
  )
}

// ── Main manager ──────────────────────────────────────────────────────────────

export default function ScheduleManager({ entries }: { entries: ScheduleEntry[] }) {
  const [showAdd, setShowAdd] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const sorted = [...entries].sort((a, b) =>
    a.day_of_week !== b.day_of_week
      ? a.day_of_week - b.day_of_week
      : a.start_time.localeCompare(b.start_time),
  )

  return (
    <div>
      {sorted.length === 0 && !showAdd && (
        <p className="font-mono text-xs text-cyber-muted mb-4">No schedule entries yet.</p>
      )}

      {sorted.length > 0 && (
        <div className="border border-cyber-border overflow-hidden mb-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cyber-border bg-cyber-elevated">
                {['Day', 'Time', 'Game', 'Note', 'Active', ''].map(h => (
                  <th key={h} className="text-left font-mono text-xs tracking-widest text-cyber-muted uppercase px-3 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(entry =>
                editingId === entry.id ? (
                  <tr key={entry.id}>
                    <td colSpan={6} className="p-0">
                      <EditEntryForm entry={entry} onDone={() => setEditingId(null)} />
                    </td>
                  </tr>
                ) : (
                  <tr key={entry.id} className="border-b border-cyber-border last:border-0 hover:bg-cyber-elevated transition-colors">
                    <td className="px-3 py-2.5 font-mono text-xs text-cyber-text">{DAYS[entry.day_of_week]}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-cyber-muted whitespace-nowrap">
                      {fmt12(entry.start_time)}{entry.end_time ? ` – ${fmt12(entry.end_time)}` : ''}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-xs text-cyber-muted">{entry.game ?? '—'}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-cyber-muted">{entry.note ?? '—'}</td>
                    <td className="px-3 py-2.5 font-mono text-xs">
                      <span className={entry.active ? 'text-cyber-green' : 'text-cyber-muted'}>
                        {entry.active ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditingId(entry.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs text-cyber-cyan hover:text-cyber-magenta transition-colors mr-3"
                      >
                        <PenLine className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => deleteScheduleEntry(entry.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs text-cyber-muted hover:text-cyber-magenta transition-colors"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <AddEntryForm onDone={() => setShowAdd(false)} />
      )}

      {!showAdd && (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 px-4 py-2 hover:border-cyber-cyan hover:glow-box-cyan transition-all clip-corner-sm"
        >
          <Plus className="h-3.5 w-3.5" /> ADD ENTRY
        </button>
      )}
    </div>
  )
}
