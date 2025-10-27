"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../datatable/data-table-column-header"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

// 🔹 Define your user data type
export type User = {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  email: string
  phone: string
  dateOfBirth: string
}

// 🔹 Table column definitions
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // 🔹 ID
  {
    accessorKey: "id",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
  },

  // 🔹 First Name
  {
    accessorKey: "firstName",
    header: ({ column }) => ( 
      <DataTableColumnHeader
        column={column}
        title="First Name"
      />
    ),
  },

  // 🔹 Last Name
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Name"
      />
    ),
  },

  // 🔹 Age
  {
    accessorKey: "age",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Age"
      />
    ),
  },

  // 🔹 Gender
  {
    accessorKey: "gender",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Gender"
      />
    ),
  },

  // 🔹 Email
  {
    accessorKey: "email",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Email"
      />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-[220px]">{row.getValue("email")}</div>
    ),
  },

  // 🔹 Phone
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
      />
    ),
  },

  // 🔹 Actions column
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const [isProfileOpen, setIsProfileOpen] = useState(false)
      const [showCopyMessage, setShowCopyMessage] = useState(false)

      const handleCopyEmail = () => {
        navigator.clipboard.writeText(user.email)
        setShowCopyMessage(true)
        setTimeout(() => setShowCopyMessage(false), 2000)
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyEmail}>
                Copy Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {showCopyMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
              Email is copied
            </div>
          )}

          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">ID</label>
                    <p className="text-sm">{user.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-sm">{user.age}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="text-sm">{user.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-sm">{user.lastName}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-sm">{user.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-sm">{user.phone}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]
