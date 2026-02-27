'use no memo'
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useCallback } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarBtn({
  onClick,
  active,
  label,
}: {
  onClick: () => void
  active: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      className={`px-2 py-1 font-mono text-xs tracking-wider transition-colors ${
        active
          ? 'bg-cyber-cyan text-cyber-bg'
          : 'text-cyber-muted hover:text-cyber-cyan border border-transparent hover:border-cyber-cyan/30'
      }`}
    >
      {label}
    </button>
  )
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing…',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-cyber-cyan underline' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] p-4 focus:outline-none font-sans text-sm text-cyber-text leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href ?? ''
    const url = window.prompt('URL', prev)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-cyber-border bg-cyber-surface">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-cyber-border bg-cyber-elevated">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()}            active={editor.isActive('bold')}                   label="B" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()}          active={editor.isActive('italic')}                 label="I" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} label="H2" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} label="H3" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()}      active={editor.isActive('bulletList')}             label="• List" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()}     active={editor.isActive('orderedList')}            label="1. List" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()}      active={editor.isActive('blockquote')}             label="❝" />
        <ToolbarBtn onClick={setLink}                                                    active={editor.isActive('link')}                   label="Link" />
      </div>

      {/* Editor content area */}
      <EditorContent editor={editor} />
    </div>
  )
}
