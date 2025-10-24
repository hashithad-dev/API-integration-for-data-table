"use client"

import React, { useState } from "react"
import { User } from "../payments/columns"
import { DataTable } from "../datatable/data-table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { z } from "zod"
import { DataTableColumnHeader } from "../datatable/data-table-column-header"



const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age must been 18+ required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required")
})

export default function UsersPage() {
  const [data, setData] = useState<User[]>(() => {
    const saved = localStorage.getItem('userData')
    return saved ? JSON.parse(saved) : []
  })
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [viewingUser, setViewingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phone: ''
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
      const newUser: User = {
        id: data.length + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone
      }
      const newData = [...data, newUser]
      setData(newData)
      localStorage.setItem('userData', JSON.stringify(newData))
      setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '' })
      setOpen(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errorMap[err.path[0] as string] = err.message
          }
        })
        setErrors(errorMap)
      }
    }
  }

  const handleDeleteUser = (id: number) => {
    const newData = data.filter(user => user.id !== id)
    setData(newData)
    localStorage.setItem('userData', JSON.stringify(newData))
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age.toString(),
      gender: user.gender,
      email: user.email,
      phone: user.phone
    })
    setEditOpen(true)
  }

  const handleViewUser = (user: User) => {
    setViewingUser(user)
    setViewOpen(true)
  }

  const handleUpdateUser = () => {
    if (!editingUser) return
    const updatedUser: User = {
      ...editingUser,
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: parseInt(formData.age),
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone
    }
    const newData = data.map(user => user.id === editingUser.id ? updatedUser : user)
    setData(newData)
    localStorage.setItem('userData', JSON.stringify(newData))
    setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '' })
    setEditOpen(false)
    setEditingUser(null)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
        column={column}
        title="First Name"
      />
      ),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="First Name"
      />
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="Last Name"
      />
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="Age"
      />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="Email"
      />
      ),
    },
    
    {
     accessorKey: "phone",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="Phone"
      />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex gap-2">
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleViewUser(user)}>
              👁️
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditUser(user)}>
              ✏️
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleDeleteUser(user.id)}>
              🗑️
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manual Users</h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (isOpen) {
            setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '' })
            setErrors({})
          }
        }}>
          <DialogTrigger asChild>
            <Button>+ Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onFocus={() => validateField('firstName', formData.firstName)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, firstName: value})
                    validateField('firstName', value)
                  }}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onFocus={() => validateField('lastName', formData.lastName)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, lastName: value})
                    validateField('lastName', value)
                  }}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onFocus={() => validateField('age', formData.age)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, age: value})
                    validateField('age', value)
                  }}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              <div>
                <Select value={formData.gender} onValueChange={(value) => {
                  setFormData({...formData, gender: value})
                  validateField('gender', value)
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onFocus={() => validateField('email', formData.email)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, email: value})
                    validateField('email', value)
                  }}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <Input
                  placeholder="Phone"
                  value={formData.phone}
                  onFocus={() => validateField('phone', formData.phone)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, phone: value})
                    validateField('phone', value)
                  }}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <Button onClick={handleAddUser} className="w-full">
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              <Input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <Button onClick={handleUpdateUser} className="w-full">
                Update User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {viewingUser && (
              <div className="space-y-4">
                <div><strong>ID:</strong> {viewingUser.id}</div>
                <div><strong>First Name:</strong> {viewingUser.firstName}</div>
                <div><strong>Last Name:</strong> {viewingUser.lastName}</div>
                <div><strong>Age:</strong> {viewingUser.age}</div>
                <div><strong>Gender:</strong> {viewingUser.gender}</div>
                <div><strong>Email:</strong> {viewingUser.email}</div>
                <div><strong>Phone:</strong> {viewingUser.phone}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}