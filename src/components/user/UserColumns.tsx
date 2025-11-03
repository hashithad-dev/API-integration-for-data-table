import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { FaEdit } from "react-icons/fa"
import { DataTableColumnHeader } from "../datatable/data-table-column-header"
import { DeleteIcon } from "../reusable/delete-icon"
import { ViewIcon } from "../reusable/view-icon"
import { User as QueryUser } from "../../hooks/useUsers"

interface UserColumnsProps {
  onEditUser: (user: QueryUser) => void
  onDeleteUser: (id: string) => void
}

export function createUserColumns({ onEditUser, onDeleteUser }: UserColumnsProps): ColumnDef<QueryUser>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-1">
            <ViewIcon user={user} />
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600" 
              onClick={() => onEditUser(user)}
            >
              <FaEdit className="h-4 w-4" />
            </Button>
            <DeleteIcon onDelete={() => onDeleteUser(user.id)} />
          </div>
        )
      },
    },
  ]
}