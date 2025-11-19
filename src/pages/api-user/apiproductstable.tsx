"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../components/datatable/data-table-column-header"
import { ViewIcon } from "../../components/reusable/view-icon"
import { Product } from "../../api/productApi"

// 🔹 Table column definitions for Product
export const paymentColumns: ColumnDef<Product>[] = [
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
    accessorKey: "ID",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
  },

  // 🔹 title
  {
    accessorKey: "Title",
    header: ({ column }) => ( 
      <DataTableColumnHeader
        column={column}
        title="Title"
      />
    ),
  },

  // 🔹 category
  {
    accessorKey: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
      />
    ),
  },

  // 🔹price
  {
    accessorKey: "Price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
      />
    ),
  },

  // 🔹discountPercentage
  {
    accessorKey: "DiscountPercentage",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="DiscountPercentage"
      />
    ),
  },

  // 🔹 stock
  {
    accessorKey: "Stock",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Stock"
      />
    ),
    cell: ({ row }) => (
      <div className="truncate max-w-[220px]">{row.getValue("Stock")}</div>
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