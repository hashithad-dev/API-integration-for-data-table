import React from "react"
import { Button } from "@/components/ui/button"

interface FormActionsProps {
  onCancel: () => void
  onSubmit: () => void
  submitText: string
  isLoading?: boolean
}

export function FormActions({
  onCancel,
  onSubmit,
  submitText,
  isLoading = false
}: FormActionsProps) {
  return (
    <div className="flex gap-2 pt-2">
      <Button variant="outline" onClick={onCancel} className="flex-1 h-9">
        Cancel
      </Button>
      <Button onClick={onSubmit} className="flex-1 h-9" disabled={isLoading}>
        {isLoading ? `${submitText}...` : submitText}
      </Button>
    </div>
  )
}