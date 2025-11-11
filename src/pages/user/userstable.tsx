import React, { useState } from "react"
import { DataTable } from "../../components/datatable/data-table"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

import { z } from "zod"
import { useHybridUsers } from "../../hooks/useHybridUsers"
import { User } from "../../store/userStore"
import { UserDialog } from "../../components/user/UserDialog"
import { UserForm } from "../../components/user/UserForm"
import { createUserColumns } from "../../components/user/UserColumns"
import { LoadingState, ErrorState } from "../../components/user/LoadingState"
import { userSchema } from "../../schemas/userSchema"

export default function UsersPage() {
  const { data = [], isLoading, error, createUserMutation, updateUserMutation, deleteUserMutation, restoreUserMutation } = useHybridUsers()
  
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateField = (name: string, value: string) => {
    try {
      userSchema.shape[name as keyof typeof userSchema.shape].parse(value)
      setErrors(prev => ({ ...prev, [name]: '' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.issues[0]?.message || '' }))
      }
    }
  }

  const handleAddUser = () => {
    try {
      userSchema.parse(formData)
      setErrors({})
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      }
      createUserMutation.mutate(newUser, {
        onSuccess: (data: any) => {
          console.log('Create success data:', data)
          setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
          setOpen(false)
          toast.success(data.message || '')
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'Failed to add user'
          toast.error(errorMessage)
          console.error('Error creating user:', error)
        }
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errorMap[err.path[0] as string] = err.message
          }
        })
        setErrors(errorMap)
        const firstErrorField = error.issues[0]?.path[0] as string
        if (firstErrorField === 'firstName') {
          (document.querySelector('input[placeholder="First Name"]') as HTMLInputElement)?.focus()
        }
      }
    }
  }

  const handleDeleteUser = (id: string) => {
    const userToDelete = data.find((user: User) => user.id === id)
    if (!userToDelete) return
    
    deleteUserMutation.mutate(id, {
      onSuccess: (data: any) => {
        console.log('Delete success data:', data)
        console.log('Delete API response:', data)
        const message = data?.message || 'User deleted successfully!'
        toast.success(message, {
          action: {
            label: 'Undo',
            onClick: () => {
              restoreUserMutation.mutate(userToDelete, {
                onSuccess: (restoreData: any) => {
                  console.log('Restore success data:', restoreData)
                  toast.success(restoreData.message || 'User restored successfully!')
                },
                onError: (restoreError: any) => {
                  console.error('Restore error:', restoreError)
                  toast.error('Failed to restore user')
                }
              })
            }
          }
        })
      },
      onError: (error: any) => {
        console.error('Delete error details:', error)
        const errorMessage = error.response?.data?.message || 'Failed to delete user'
        toast.error(errorMessage)
      }
    })
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth
    })
    setEditOpen(true)
  }

  const handleUpdateUser = () => {
    if (!editingUser) return
    const updatedUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth
    }
    const fullUpdatedUser: User = {
      ...editingUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth
    }
    updateUserMutation.mutate(fullUpdatedUser, {
      onSuccess: (data: any) => {
        console.log('Update success data:', data)
        setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
        setEditOpen(false)
        setEditingUser(null)
        toast.success(data.message || 'User updated successfully!')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'Failed to update user'
        toast.error(errorMessage)
        console.error('Error updating user:', error)
      }
    })
  }

  const columns = createUserColumns({
    onEditUser: handleEditUser,
    onDeleteUser: handleDeleteUser
  })

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manual Users</h1>
          <UserDialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen)
              if (isOpen) {
                setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
                setErrors({})
              }
            }}
            title="Add New User"
          >
            <UserForm
              formData={formData}
              errors={errors}
              onFormDataChange={setFormData}
              onFieldValidation={validateField}
              onSubmit={handleAddUser}
              onCancel={() => setOpen(false)}
              submitText="Add User"
              isLoading={createUserMutation.isPending}
            />
          </UserDialog>
          <Button onClick={() => setOpen(true)}>+ Add User</Button>
          <UserDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            title="Edit User"
          >
            <UserForm
              formData={formData}
              errors={{}}
              onFormDataChange={setFormData}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditOpen(false)}
              submitText="Update User"
              isLoading={updateUserMutation.isPending}
            />
          </UserDialog>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <DataTable columns={columns} data={data} />
        </div>

      </div>
    </div>
  )
}