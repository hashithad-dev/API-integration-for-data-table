"use client"

import { ColumnDef } from "@tanstack/react-table"

declare global {
  interface Window {
    handleEditProduct?: (product: Product) => void
    handleDeleteProduct?: (id: string) => void
  }
}
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../../components/customUi/data-table-column-header"
import { ViewIcon } from "../../components/customUi/view-icon"
import { Product } from "../../api/productApi"
import { Button } from "@/components/ui/button"
import { FaEdit } from "react-icons/fa"
import { DeleteIcon } from "../../components/customUi/delete-icon"

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
    cell: ({ row }) => <div>{row.getValue("ID")}</div>,
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
    cell: ({ row }) => <div>{row.getValue("Title")}</div>,
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
    cell: ({ row }) => <div>{row.getValue("Category")}</div>,
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
    cell: ({ row }) => <div>${row.getValue("Price")}</div>,
  },

  // 🔹discountPercentage
  {
    accessorKey: "DiscountPercentage",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Discount %"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("DiscountPercentage")}%</div>,
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

  // 🔹 image
  {
    accessorKey: "Image",
    header: ({ column }) => (
       <DataTableColumnHeader
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const image = row.getValue("Image") as string
      return image ? (
        <img src={image} alt="Product" className="w-12 h-12 object-cover rounded" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">No Image</div>
      )
    },
  },

  // 🔹 Actions column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex items-center gap-1">
          <ViewIcon user={product} />
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600" 
            onClick={() => window.handleEditProduct?.(product)}
          >
            <FaEdit className="h-4 w-4" />
          </Button>
          <DeleteIcon onDelete={() => window.handleDeleteProduct?.(product._id!)} />
        </div>
      )
    },
  },
]