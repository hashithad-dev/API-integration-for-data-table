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
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
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
  phone: z.string().min(1, "Phone is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required")
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
      const newUser: User = {
        id: data.length === 0 ? 1 : Math.max(...data.map(u => u.id)) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age),
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      }
      const newData = [...data, newUser]
      setData(newData)
      localStorage.setItem('userData', JSON.stringify(newData))
      setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
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
      phone: user.phone,
      dateOfBirth: user.dateOfBirth
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
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth
    }
    const newData = data.map(user => user.id === editingUser.id ? updatedUser : user)
    setData(newData)
    localStorage.setItem('userData', JSON.stringify(newData))
    setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
    setEditOpen(false)
    setEditingUser(null)
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
        column={column}
        title="ID"
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
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
         <DataTableColumnHeader
        column={column}
        title="Date of Birth"
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
              <FaEye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditUser(user)}>
              <FaEdit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => handleDeleteUser(user.id)}>
              <FaTrash className="h-4 w-4" />
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
            setFormData({ firstName: '', lastName: '', age: '', gender: '', email: '', phone: '', dateOfBirth: '' })
            setErrors({})
          }
        }}>
          <DialogTrigger asChild>
            <Button>+ Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    className="h-9"
                    onFocus={() => validateField('firstName', formData.firstName)}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({...formData, firstName: value})
                      validateField('firstName', value)
                    }}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    className="h-9"
                    onFocus={() => validateField('lastName', formData.lastName)}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({...formData, lastName: value})
                      validateField('lastName', value)
                    }}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    className="h-9"
                    onFocus={() => validateField('age', formData.age)}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({...formData, age: value})
                      validateField('age', value)
                    }}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <Select value={formData.gender} onValueChange={(value) => {
                    setFormData({...formData, gender: value})
                    validateField('gender', value)
                  }}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  className="h-9"
                  onFocus={() => validateField('email', formData.email)}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({...formData, email: value})
                    validateField('email', value)
                  }}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    className="h-9"
                    onFocus={() => validateField('phone', formData.phone)}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({...formData, phone: value})
                      validateField('phone', value)
                    }}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    className="h-9"
                    onFocus={() => validateField('dateOfBirth', formData.dateOfBirth)}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({...formData, dateOfBirth: value})
                      validateField('dateOfBirth', value)
                    }}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 h-9">
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="flex-1 h-9">
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Edit User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="First Name"
                    value={formData.firstName}
                    className="h-9"
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Last Name"
                    value={formData.lastName}
                    className="h-9"
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    className="h-9"
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  className="h-9"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    className="h-9"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dateOfBirth}
                    className="h-9"
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" onClick={() => setEditOpen(false)} className="flex-1 h-9">
                  Cancel
                </Button>
                <Button onClick={handleUpdateUser} className="flex-1 h-9">
                  Update User
                </Button>
              </div>
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
                <div><strong>Date of Birth:</strong> {viewingUser.dateOfBirth}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}