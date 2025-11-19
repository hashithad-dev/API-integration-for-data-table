import { useState } from "react"
import { paymentColumns } from "./apiproductstable"
import { DataTable } from "../../components/datatable/data-table"
import { useProducts } from "../../hooks/useProducts"
import { productApi } from "../../api/productApi"
import { toast } from "sonner"

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { data, isLoading, error } = useProducts(currentPage, pageSize)

  const loadSampleData = async () => {
    try {
      await productApi.populateProducts()
      toast.success('Sample products loaded!')
      window.location.reload()
    } catch (error) {
      toast.error('Failed to load sample data')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-900 bg-white">
        Loading products...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold bg-white">
        Failed to load products.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">API Data - Products</h1>
          {/* <button onClick={loadSampleData} className="bg-blue-500 text-white px-4 py-2 rounded">
            Load Sample Data
          </button> */}
        </div>
        <div className="bg-white rounded-lg shadow-lg">
          <DataTable 
            columns={paymentColumns} 
            data={data?.products || []} 
            totalRows={data?.products?.length || 0}
            isServerSide={true}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            hasNextPage={data?.hasMore}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => {
              setPageSize(newPageSize)
              setCurrentPage(1)
            }}
          />
        </div>
      </div>
    </div>
  )
}
