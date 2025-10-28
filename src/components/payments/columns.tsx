"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
import { ViewIcon } from "../reusable/view-icon"
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
      const [showCopyMessage, setShowCopyMessage] = useState(false)

      const handleCopyEmail = () => {
        navigator.clipboard.writeText(user.email)
        setShowCopyMessage(true)
        setTimeout(() => setShowCopyMessage(false), 2000)
      }

      return (
        <div className="flex items-center gap-2">
          <ViewIcon user={user} />
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
            </DropdownMenuContent>
          </DropdownMenu>

          {showCopyMessage && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
              Email is copied
            </div>
          )}
        </div>
      )
    },
  },
]
