import React, { useState } from "react"
import { paymentColumns } from "./apiproductstable"
import { DataTable } from "../../components/datatable/data-table"
import { useProducts } from "../../hooks/useProducts"
import { productApi, Product } from "../../api/productApi"
import { toast } from "sonner"
import { ProductDialog } from "../../components/product/ProductDialog"
import { AddProductForm } from "../../components/product/AddProductForm"
import { Button } from "@/components/ui/button"

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { data, isLoading, error } = useProducts(currentPage, pageSize)

  const handleDeleteProduct = async (id: string) => {
    try {
      await productApi.deleteProduct(id)
      toast.success('Product deleted successfully!')
      window.location.reload()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setEditOpen(true)
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return
    try {
      await productApi.updateProduct(editingProduct._id!, editingProduct)
      setEditOpen(false)
      setEditingProduct(null)
      toast.success('Product updated successfully!')
      window.location.reload()
    } catch (error) {
      toast.error('Failed to update product')
    }
  }

  React.useEffect(() => {
    (window as any).handleEditProduct = handleEditProduct;
    (window as any).handleDeleteProduct = handleDeleteProduct;
  }, [])

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
          <ProductDialog
            open={open}
            onOpenChange={setOpen}
            title="Add New Product"
          >
            <AddProductForm
              onSuccess={() => {
                setOpen(false)
                window.location.reload()
              }}
              onCancel={() => setOpen(false)}
            />
          </ProductDialog>
          <Button onClick={() => setOpen(true)}>+ Add Product</Button>
          <ProductDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            title="Edit Product"
          >
            <AddProductForm
              onSuccess={() => {
                setEditOpen(false)
                setEditingProduct(null)
                window.location.reload()
              }}
              onCancel={() => setEditOpen(false)}
              initialData={editingProduct ? {
                ID: editingProduct.ID.toString(),
                Title: editingProduct.Title,
                Category: editingProduct.Category,
                Price: editingProduct.Price.toString(),
                DiscountPercentage: editingProduct.DiscountPercentage.toString(),
                Stock: editingProduct.Stock.toString(),
                Image: editingProduct.Image || ''
              } : undefined}
              isEdit={true}
              productId={editingProduct?._id}
            />
          </ProductDialog>
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
