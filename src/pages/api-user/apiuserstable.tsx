"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../components/datatable/data-table-column-header"
import { ViewIcon } from "../../components/reusable/view-icon"
import { PaymentUser } from "../../hooks/apiusers"

// 🔹 Table column definitions for PaymentUser
export const paymentColumns: ColumnDef<PaymentUser>[] = [
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
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original
      return <ViewIcon user={user} />
    },
  },
]