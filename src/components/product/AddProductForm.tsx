import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { productApi } from '../../api/productApi'
import { toast } from 'sonner'

interface AddProductFormProps {
  onSuccess: () => void
  onCancel: () => void
  initialData?: {
    ID: string
    Title: string
    Category: string
    Price: string
    DiscountPercentage: string
    Stock: string
    Image: string
  }
  isEdit?: boolean
  productId?: string
}

export function AddProductForm({ onSuccess, onCancel, initialData, isEdit = false, productId }: AddProductFormProps) {
  const [formData, setFormData] = useState(initialData || {
    ID: '',
    Title: '',
    Category: '',
    Price: '',
    DiscountPercentage: '',
    Stock: '',
    Image: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEdit && productId) {
        await productApi.updateProduct(productId, {
          ID: parseInt(formData.ID),
          Title: formData.Title,
          Category: formData.Category,
          Price: parseFloat(formData.Price),
          DiscountPercentage: parseFloat(formData.DiscountPercentage),
          Stock: parseInt(formData.Stock),
          Image: formData.Image
        })
        toast.success('Product updated successfully!')
      } else {
        await productApi.createProduct({
          ID: parseInt(formData.ID),
          Title: formData.Title,
          Category: formData.Category,
          Price: parseFloat(formData.Price),
          DiscountPercentage: parseFloat(formData.DiscountPercentage),
          Stock: parseInt(formData.Stock),
          Image: formData.Image
        })
        toast.success('Product added successfully!')
      }
      onSuccess()
    } catch (error) {
      toast.error(isEdit ? 'Failed to update product' : 'Failed to add product')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        placeholder="ID" 
        type="number" 
        value={formData.ID}
        onChange={(e) => setFormData({...formData, ID: e.target.value})}
        required 
      />
      <Input 
        placeholder="Title" 
        value={formData.Title}
        onChange={(e) => setFormData({...formData, Title: e.target.value})}
        required 
      />
      <Input 
        placeholder="Category" 
        value={formData.Category}
        onChange={(e) => setFormData({...formData, Category: e.target.value})}
        required 
      />
      <Input 
        placeholder="Price" 
        type="number" 
        step="0.01" 
        value={formData.Price}
        onChange={(e) => setFormData({...formData, Price: e.target.value})}
        required 
      />
      <Input 
        placeholder="Discount %" 
        type="number" 
        step="0.01" 
        value={formData.DiscountPercentage}
        onChange={(e) => setFormData({...formData, DiscountPercentage: e.target.value})}
        required 
      />
      <Input 
        placeholder="Stock" 
        type="number" 
        value={formData.Stock}
        onChange={(e) => setFormData({...formData, Stock: e.target.value})}
        required 
      />
      <div className="space-y-2">
        <label className="text-sm font-medium">Product Image</label>
        <Input 
          type="file" 
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) {
              console.log('File selected:', file.name)
              setImageFile(file)
              
              const reader = new FileReader()
              reader.onload = async (event) => {
                const base64String = event.target?.result as string
                console.log('Base64 created, uploading to Cloudinary...')
                
                try {
                  const response = await fetch('http://localhost:8000/api/upload/image', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64String })
                  })
                  
                  console.log('Response status:', response.status)
                  console.log('Response ok:', response.ok)
                  
                  if (response.ok) {
                    const data = await response.json()
                    console.log('Upload successful:', data.url)
                    setFormData({...formData, Image: data.url})
                    toast.success('Image uploaded successfully!')
                  } else {
                    const errorText = await response.text()
                    console.error('Upload failed - Status:', response.status)
                    console.error('Upload failed - Error:', errorText)
                    toast.error(`Upload failed: ${response.status} - ${errorText}`)
                  }
                } catch (error) {
                  console.error('Upload error:', error)
                  toast.error('Failed to upload image')
                }
              }
              
              reader.onerror = () => {
                toast.error('Failed to read file')
              }
              
              reader.readAsDataURL(file)
            }
          }}
        />
        {formData.Image && (
          <img src={formData.Image} alt="Preview" className="w-20 h-20 object-cover rounded" />
        )}
      </div>
      <div className="flex gap-2">
        <Button type="submit">{isEdit ? 'Update Product' : 'Add Product'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}