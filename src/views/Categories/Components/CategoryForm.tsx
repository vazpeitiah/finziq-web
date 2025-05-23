import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button, RadioGroup, TextField } from 'components'
import AppFrame from 'frames/AppFrame'
import {
  Category,
  CreateCategoryDto,
  CreateCategorySchema
} from 'models/Category'
import useCreateCategory from 'queries/categories/useCreateCategory'
import useUpdateCategory from 'queries/categories/useUpdateCategory'
import useCreateSubcategory from 'queries/subcategories/useCreateSubcategory'
import { TransactionTypes, TransactionTypesOptions } from 'utils/config'

interface FormProps {
  selectedCategory?: Category
  type: TransactionTypes
  isSubcategory?: boolean
}

const defaultValues: CreateCategoryDto = {
  name: '',
  type: TransactionTypes.EXPENSE
}

const CategoryForm = ({ selectedCategory, type, isSubcategory }: FormProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isUpdate = !!selectedCategory
  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<CreateCategoryDto>({
    defaultValues,
    resolver: zodResolver(CreateCategorySchema)
  })
  console.log('errors', errors)
  const { createCategory, isSuccess: isSuccessCreated } = useCreateCategory()
  const { updateCategory, isSuccess: isSuccessUpdated } = useUpdateCategory()
  const { createSubcategory } = useCreateSubcategory()
  const formattedOptions = TransactionTypesOptions.map((item) => ({
    ...item,
    label: t(item.label ?? '')
  }))

  useEffect(() => {
    if (selectedCategory) {
      reset(selectedCategory)
    }
  }, [selectedCategory?.id])

  useEffect(() => {
    if (isSuccessCreated || isSuccessUpdated) {
      handleReset()
      navigate(-1)
    }
  }, [isSuccessCreated, isSuccessUpdated])

  const handleOnSubmit: SubmitHandler<CreateCategoryDto> = (data) => {
    if (isUpdate) {
      updateCategory({ id: selectedCategory?.id as string, body: data })
    } else {
      !isSubcategory
        ? createCategory(data)
        : createSubcategory({
            ...data,
            categoryId: selectedCategory?.id as string
          })
    }
  }

  const handleReset = () => {
    navigate(-1)
    reset(defaultValues)
  }

  return (
    <AppFrame>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              id={field.name}
              label={t('categories.name')}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              showError={!!error}
              error={error?.message ? t(error.message) : ''}
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <RadioGroup {...field} options={formattedOptions} />
          )}
        />
        <div className="flex gap-2 mt-4">
          <Button variant="outline" onClick={handleReset} className="grow">
            {t('buttons.cancel')}
          </Button>
          <Button variant="primary" type="submit" className="grow">
            {isUpdate ? t('buttons.update') : t('buttons.add')}
          </Button>
        </div>
      </form>
    </AppFrame>
  )
}

export default CategoryForm
