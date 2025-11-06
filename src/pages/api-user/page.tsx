import { paymentColumns } from "./apiproductstable"
import { DataTable } from "../../components/datatable/data-table"
import { useApiUsers } from "../../hooks/useApiUsers"

export default function UsersPage() {
  const { data = [], isLoading, error } = useApiUsers()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-900">
        Loading user data...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 dark:text-red-400 font-semibold bg-white dark:bg-gray-900">
        Failed to load user data.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">API Data - Products</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <DataTable columns={paymentColumns} data={data} />
        </div>
      </div>
    </div>
  )
}
