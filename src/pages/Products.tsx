import { useState, useEffect } from 'react'
import { productApi, Product } from '../api/productApi'
import { toast } from 'sonner'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchProducts = async (page: number) => {
    setLoading(true)
    try {
      const data = await productApi.getProducts(page)
      setProducts(data.products)
      setHasMore(data.hasMore)
      setCurrentPage(data.currentPage)
    } catch (error) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const loadSampleData = async () => {
    try {
      await productApi.populateProducts()
      toast.success('Sample products loaded!')
      fetchProducts(1)
    } catch (error) {
      toast.error('Failed to load sample data')
    }
  }

  useEffect(() => {
    fetchProducts(1)
  }, [])

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={loadSampleData} className="bg-blue-500 text-white px-4 py-2 rounded">
          Load Sample Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{product.Title}</h3>
            <p className="text-gray-600">{product.Category}</p>
            <div className="mt-2">
              <span className="text-xl font-bold">${product.Price}</span>
              {product.DiscountPercentage > 0 && (
                <span className="ml-2 text-green-600">-{product.DiscountPercentage}%</span>
              )}
            </div>
            <p className="text-sm text-gray-500">Stock: {product.Stock}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={() => fetchProducts(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-blue-100 rounded">Page {currentPage}</span>
        <button 
          onClick={() => fetchProducts(currentPage + 1)}
          disabled={!hasMore || loading}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}