import { paymentColumns } from "./apiproductstable"
import { DataTable } from "../../components/datatable/data-table"
import { useApiUsers } from "../../hooks/useApiUsers"

export default function UsersPage() {
  const { data = [], isLoading, error } = useApiUsers()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading user data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
        Failed to load user data.
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">API Data - Products</h1>
      <DataTable columns={paymentColumns} data={data} />
    </div>
  )
}
