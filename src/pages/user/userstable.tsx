import React, { useState } from "react"
import { DataTable } from "../../components/datatable/data-table"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast'

import { z } from "zod"
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, User as QueryUser } from "../../hooks/useUsers"
import { useRestoreUser } from "../../hooks/useRestoreUser"
import { UserDialog } from "../../components/user/UserDialog"
import { UserForm } from "../../components/user/UserForm"
import { createUserColumns } from "../../components/user/UserColumns"
import { LoadingState, ErrorState } from "../../components/user/LoadingState"
import { userSchema } from "../../schemas/userSchema"

export default function UsersPage() {
  const { data = [], isLoading, error } = useUsers()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()
  const restoreUserMutation = useRestoreUser()
  
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<QueryUser | null>(null)

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
        onSuccess: () => {
          setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
          setOpen(false)
          toast.success('User added successfully!', {
            duration: 3000,
            position: 'bottom-center',
          })
        },
        onError: (error) => {
          toast.error('Failed to add user')
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
        // Focus on first error field
        const firstErrorField = error.issues[0]?.path[0] as string
        if (firstErrorField === 'firstName') {
          (document.querySelector('input[placeholder="First Name"]') as HTMLInputElement)?.focus()
        }
      }
    }
  }

  const handleDeleteUser = (id: string) => {
    const userToDelete = data.find(user => user.id === id)
    if (!userToDelete) return
    
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        toast.success(
          (t) => (
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{userToDelete.firstName} {userToDelete.lastName} deleted!</div>
              </div>
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  restoreUserMutation.mutate(userToDelete, {
                    onSuccess: () => {
                      toast.success('User restored successfully!', {
                        duration: 2000,
                        position: 'bottom-center',
                      })
                    }
                  })
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Undo
              </button>
            </div>
          ),
          {
            duration: 5000,
            position: 'bottom-center',
          }
        )
      },
      onError: (error) => {
        toast.error('Failed to delete user')
        console.error('Error deleting user:', error)
      }
    })
  }

  const handleEditUser = (user: QueryUser) => {
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
    const updatedUser: QueryUser = {
      ...editingUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth
    }
    updateUserMutation.mutate(updatedUser, {
      onSuccess: () => {
        setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
        setEditOpen(false)
        setEditingUser(null)
        toast.success('User updated successfully!', {
          duration: 3000,
          position: 'bottom-center',
        })
      },
      onError: (error) => {
        toast.error('Failed to update user')
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manual Users</h1>
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
      <DataTable columns={columns} data={data} />
      <Toaster />
    </div>
  )
}