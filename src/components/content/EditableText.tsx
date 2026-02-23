'use client'

import React, { useState, useCallback, ElementType } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { useContent } from '@/contexts/ContentContext'

interface EditableTextProps {
  contentKey: string
  as?: ElementType
  className?: string
  fallback?: string
}

export function EditableText({
  contentKey,
  as: Component = 'span',
  className = '',
  fallback = '',
}: EditableTextProps) {
  const { editMode, isOmApexUser } = useEditMode()
  const { getContent, updateContent } = useContent()

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  const currentValue = getContent(contentKey, fallback)
  const canEdit = editMode && isOmApexUser

  const handleOpenEdit = useCallback(() => {
    setEditValue(currentValue)
    setIsEditing(true)
  }, [currentValue])

  const handleSave = useCallback(async () => {
    if (editValue === currentValue) {
      setIsEditing(false)
      return
    }
    setSaving(true)
    try {
      const success = await updateContent(contentKey, editValue)
      if (success) setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }, [contentKey, editValue, currentValue, updateContent])

  const handleCancel = useCallback(() => {
    setEditValue(currentValue)
    setIsEditing(false)
  }, [currentValue])

  if (!canEdit) {
    return <Component className={className}>{currentValue}</Component>
  }

  return (
    <div className="relative inline">
      <Component
        className={`${className} cursor-pointer relative group`}
        style={{
          outline: '2px dashed rgba(201, 162, 39, 0.5)',
          outlineOffset: '4px',
        }}
        onClick={handleOpenEdit}
      >
        {currentValue}
        <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary text-white p-1 rounded-full shadow-lg text-xs">
          ✏️
        </span>
      </Component>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={handleCancel}>
          <div className="bg-white rounded-lg shadow-xl p-4 w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded text-brand-primary font-mono">
                {contentKey}
              </code>
            </div>
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleCancel}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || editValue === currentValue}
                className="px-3 py-1.5 text-sm bg-brand-primary text-white rounded-md hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function EditableList({
  contentKey,
  className = '',
  itemClassName = '',
  fallback = '',
  renderItem,
}: {
  contentKey: string
  className?: string
  itemClassName?: string
  fallback?: string
  renderItem?: (item: string, index: number) => React.ReactNode
}) {
  const { editMode, isOmApexUser } = useEditMode()
  const { getContent, updateContent } = useContent()

  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  const currentValue = getContent(contentKey, fallback)
  const items = currentValue.split('|').filter(Boolean)
  const canEdit = editMode && isOmApexUser

  const handleOpenEdit = useCallback(() => {
    setEditValue(currentValue)
    setIsEditing(true)
  }, [currentValue])

  const handleSave = useCallback(async () => {
    if (editValue === currentValue) {
      setIsEditing(false)
      return
    }
    setSaving(true)
    try {
      const success = await updateContent(contentKey, editValue)
      if (success) setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }, [contentKey, editValue, currentValue, updateContent])

  const defaultRenderItem = (item: string, index: number) => (
    <li key={index} className={itemClassName}>{item}</li>
  )

  const content = (
    <ul className={className}>
      {items.map(renderItem || defaultRenderItem)}
    </ul>
  )

  if (!canEdit) return content

  return (
    <div className="relative">
      <div
        className="cursor-pointer relative group"
        style={{ outline: '2px dashed rgba(201, 162, 39, 0.5)', outlineOffset: '4px' }}
        onClick={handleOpenEdit}
      >
        {content}
        <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-primary text-white p-1 rounded-full shadow-lg text-xs">
          ✏️
        </span>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setIsEditing(false)}>
          <div className="bg-white rounded-lg shadow-xl p-4 w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2">
              <code className="text-xs bg-gray-100 px-2 py-1 rounded text-brand-primary font-mono">{contentKey}</code>
              <p className="text-xs text-gray-500 mt-1">Separate items with | (pipe)</p>
            </div>
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setIsEditing(false)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving || editValue === currentValue} className="px-3 py-1.5 text-sm bg-brand-primary text-white rounded-md hover:opacity-90 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
