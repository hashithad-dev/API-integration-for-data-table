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

  const handleConfirmDelete = () => {
    setShowConfirm(false)
    onDelete()
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
        <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 shadow-lg">
          <DialogHeader className="space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <FaTrash className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center text-lg font-semibold text-gray-900">
              Delete Confirmation
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 h-10" 
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1 h-10 bg-red-600 hover:bg-red-700" 
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}