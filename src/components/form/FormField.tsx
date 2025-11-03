import React from "react"
import { Input } from "@/components/ui/input"

interface FormFieldProps {
  label: string
  value: string
  placeholder?: string
  type?: string
  error?: string
  onChange: (value: string) => void
  onFocus?: () => void
}

export function FormField({
  label,
  value,
  placeholder,
  type = "text",
  error,
  onChange,
  onFocus
}: FormFieldProps) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Input
        type={type}
        placeholder={placeholder || label}
        value={value}
        className="h-9"
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}