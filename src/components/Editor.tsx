/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic'
import React, { useMemo, useRef, useState } from 'react'

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

type PostEditorProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function Editor({ placeholder, value, onChange }: PostEditorProps) {
  const editor = useRef(null)
  const [content, setContent] = useState<string>(value)

  const config = useMemo(
    () => ({
      cache: true,
      placeholder: placeholder || '',
      statusbar: false,
      buttons: ['bold', 'italic', 'underline', '|', 'ul'],
    }),
    [placeholder],
  )

  function handleChange(value: string) {
    setContent(value)
    onChange(value)
  }

  return (
    <>
      <p className="text-xs text-primary">
        Descrição: <span className="text-slate-500">(opcional)</span>
      </p>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)}
        onChange={handleChange}
        className="mb-2"
      />
    </>
  )
}
