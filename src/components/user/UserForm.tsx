import React from "react"
import { FormField } from "../form/FormField"
import { SelectField } from "../form/SelectField"
import { FormActions } from "../form/FormActions"
import { UserFormData } from "../../schemas/userSchema"

interface UserFormProps {
  formData: UserFormData
  errors: Record<string, string>
  onFormDataChange: (data: UserFormData) => void
  onFieldValidation?: (name: string, value: string) => void
  onSubmit: () => void
  onCancel: () => void
  submitText: string
  isLoading?: boolean
}

export function UserForm({
  formData,
  errors,
  onFormDataChange,
  onFieldValidation,
  onSubmit,
  onCancel,
  submitText,
  isLoading = false
}: UserFormProps) {
  const handleFieldChange = (field: keyof UserFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value })
    onFieldValidation?.(field, value)
  }

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ]

  return (
    <div className="grid gap-3 py-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="First Name"
          value={formData.firstName}
          error={errors.firstName}
          onChange={(value) => handleFieldChange('firstName', value)}
          onFocus={() => onFieldValidation?.('firstName', formData.firstName)}
        />
        <FormField
          label="Last Name"
          value={formData.lastName}
          error={errors.lastName}
          onChange={(value) => handleFieldChange('lastName', value)}
          onFocus={() => onFieldValidation?.('lastName', formData.lastName)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Age"
          type="number"
          value={formData.age}
          error={errors.age}
          onChange={(value) => handleFieldChange('age', value)}
          onFocus={() => onFieldValidation?.('age', formData.age)}
        />
        <SelectField
          label="Gender"
          value={formData.gender}
          options={genderOptions}
          error={errors.gender}
          onChange={(value) => handleFieldChange('gender', value)}
        />
      </div>
      <FormField
        label="Email Address"
        type="email"
        value={formData.email}
        error={errors.email}
        onChange={(value) => handleFieldChange('email', value)}
        onFocus={() => onFieldValidation?.('email', formData.email)}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Phone Number"
          value={formData.phone}
          error={errors.phone}
          onChange={(value) => handleFieldChange('phone', value)}
          onFocus={() => onFieldValidation?.('phone', formData.phone)}
        />
        <FormField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          error={errors.dateOfBirth}
          onChange={(value) => handleFieldChange('dateOfBirth', value)}
          onFocus={() => onFieldValidation?.('dateOfBirth', formData.dateOfBirth)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Profile Image</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = async (event) => {
                const base64String = event.target?.result as string
                try {
                  console.log('Uploading to S3...');
                  const response = await fetch('http://localhost:8000/api/upload/s3', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64String })
                  })
                  
                  console.log('S3 response status:', response.status);
                  
                  if (response.ok) {
                    const data = await response.json()
                    console.log('S3 upload success:', data.url);
                    console.log('Setting image URL in form:', data.url);
                    handleFieldChange('image', data.url)
                    console.log('Form data after image set:', { ...formData, image: data.url });
                  } else {
                    const errorText = await response.text();
                    console.error('S3 upload failed:', response.status, errorText);
                  }
                } catch (error) {
                  console.error('S3 upload error:', error)
                }
              }
              reader.readAsDataURL(file)
            }
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {formData.image && (
          <div className="space-y-2">
            <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
            <input 
              type="text" 
              value={formData.image} 
              readOnly 
              className="w-full p-2 border rounded text-xs bg-gray-50"
              placeholder="Image URL will appear here"
            />
          </div>
        )}
      </div>
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        submitText={submitText}
        isLoading={isLoading}
      />
    </div>
  )
}