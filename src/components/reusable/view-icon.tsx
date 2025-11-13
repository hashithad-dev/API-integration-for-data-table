import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface User {
  id: string | number
  firstName?: string
  lastName?: string
  age?: string | number
  gender?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  title?: string
  category?: string
  price?: number
  discountPercentage?: number
  stock?: number
}

interface ViewIconProps {
  user: User
  className?: string
}

export const ViewIcon: React.FC<ViewIconProps> = ({ user, className = '' }) => {
  const [viewOpen, setViewOpen] = useState(false)
  const isProduct = user.title !== undefined

  return (
    <>
      <Button 
        variant="ghost" 
        className={`h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 ${className}`} 
        onClick={() => setViewOpen(true)}
      >
        <FaEye className="h-4 w-4" />
      </Button>
      
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-sm bg-white border border-gray-200 shadow-lg">
          <DialogHeader className="border-b pb-2">
            <DialogTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaEye className="text-blue-600 h-4 w-4" />
              {isProduct ? 'Product Details' : 'User Profile'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-3">
            {isProduct ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border border-blue-100">
                  <div>
                    <p className="text-xs font-medium text-blue-700">Product Name</p>
                    <p className="text-sm font-bold text-gray-900">{user.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">ID: {user.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 rounded border border-green-100">
                    <p className="text-xs font-medium text-green-700">Category</p>
                    <p className="text-xs font-semibold text-gray-900">{user.category}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded border border-purple-100">
                    <p className="text-xs font-medium text-purple-700">Stock</p>
                    <p className="text-xs font-semibold text-gray-900">{user.stock}</p>
                  </div>
                </div>
                
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-600">Price</p>
                  <p className="text-xs font-semibold text-gray-900">${user.price}</p>
                </div>
                
                <div className="p-2 bg-orange-50 rounded border border-orange-100">
                  <p className="text-xs font-medium text-orange-700">Discount</p>
                  <p className="text-xs font-semibold text-gray-900">{user.discountPercentage}%</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border border-blue-100">
                  <div>
                    <p className="text-xs font-medium text-blue-700">Full Name</p>
                    <p className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">ID: {user.id}</p>
                    <p className="text-xs font-semibold text-gray-700">{user.age} years</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 rounded border border-green-100">
                    <p className="text-xs font-medium text-green-700">Gender</p>
                    <p className="text-xs font-semibold text-gray-900">{user.gender}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded border border-purple-100">
                    <p className="text-xs font-medium text-purple-700">Birth Date</p>
                    <p className="text-xs font-semibold text-gray-900">{user.dateOfBirth}</p>
                  </div>
                </div>
                
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <p className="text-xs font-medium text-gray-600">Email</p>
                  <p className="text-xs font-semibold text-gray-900 break-all">{user.email}</p>
                </div>
                
                <div className="p-2 bg-orange-50 rounded border border-orange-100">
                  <p className="text-xs font-medium text-orange-700">Phone</p>
                  <p className="text-xs font-semibold text-gray-900">{user.phone}</p>
                </div>
              </div>
            )}
          </div>
          <div className="border-t pt-2 flex justify-end">
            <Button onClick={() => setViewOpen(false)} size="sm">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}