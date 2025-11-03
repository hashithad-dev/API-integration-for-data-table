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
      <FormActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        submitText={submitText}
        isLoading={isLoading}
      />
    </div>
  )
}