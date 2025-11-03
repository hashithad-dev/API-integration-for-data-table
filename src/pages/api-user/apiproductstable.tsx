"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../components/datatable/data-table-column-header"
import { ViewIcon } from "../../components/reusable/view-icon"
import { PaymentUser } from "../../api/users"

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

  // 🔹 title
  {
    accessorKey: "title",
    header: ({ column }) => ( 
      <DataTableColumnHeader
        column={column}
        title="Title"
      />
    ),
  },

  // 🔹 category
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
      />
    ),
  },

  // 🔹price
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
  },

  // 🔹discountPercentage
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="DiscountPercentage"
      />
    ),
  },

  // 🔹 stock
  {
    accessorKey: "stock",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Stock"
      />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-[220px]">{row.getValue("stock")}</div>
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