import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaTrash } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteIconProps {
  onDelete: () => void
  className?: string
}

export const DeleteIcon: React.FC<DeleteIconProps> = ({ onDelete, className = '' }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirmDelete = () => {
    onDelete()
    setShowConfirm(false)
    setTimeout(() => {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }, 100)
  }

  return (
    <>
      <Button 
        variant="ghost" 
        className={`h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 ${className}`} 
        onClick={() => setShowConfirm(true)}
      >
        <FaTrash className="h-4 w-4" />
      </Button>
      
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Deleted successfully!</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccess(false)}>
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}