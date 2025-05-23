import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, Icon, IconButton, Icons, Table, Toggle } from 'components'
import AppFrame from 'frames/AppFrame'
import { Category } from 'models/Category'
import { useAlerts } from 'providers/AlertsProvider'
import useDeleteCategory from 'queries/categories/useDeleteCategory'
import useGetCategories from 'queries/categories/useGetCategories'
import useGetSubcategories from 'queries/subcategories/useGetSubcategories'
import { ROUTES, TransactionTypes, TransactionTypesOptions } from 'utils/config'

const CategoriesPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const category: Category | undefined = state?.category
  const isSubcategory = !!category
  const alerts = useAlerts()
  const [transactionType, setTransactionType] = useState<TransactionTypes>(
    TransactionTypes.EXPENSE
  )
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const { categories } = useGetCategories(transactionType)
  const { subcategories } = useGetSubcategories(category?.id)
  const { t } = useTranslation()
  const { deleteCategory } = useDeleteCategory()

  const toggleTransactionType = (checked: boolean) => {
    setTransactionType(
      checked ? TransactionTypes.INCOME : TransactionTypes.EXPENSE
    )
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
  }
  const handleClickDelete = (id: string) => {
    alerts.confirm(t('categories.confirmDelete'), () => {
      deleteCategory(id)
    })
  }

  const handleOpenSubcategories = () => {
    console.log('Open subcategories')
  }

  const handleAdd = () => {
    navigate(ROUTES.categories.add)
  }

  return (
    <AppFrame
      controls={
        <>
          {!isSubcategory && (
            <Toggle
              label={t('transactionTypes.incomes')}
              onChange={toggleTransactionType}
            />
          )}
          <Button onClick={handleAdd}>
            {t('buttons.add')}
            <Icon icon={Icons.Plus} className="size-5" />
          </Button>
        </>
      }
    >
      <Table
        getRowId={(row) => row.id}
        getSubRows={(row) => row.subcategories ?? []}
        columns={[
          {
            id: 'name',
            header: t('categories.name')
          },
          {
            id: 'type',
            header: t('categories.type'),
            render: (category) => {
              const option = TransactionTypesOptions.find(
                (option) => option.value === category.type
              )
              return option?.label ? t(option.label) : ''
            }
          },
          {
            id: 'controls',
            render: (category) => (
              <>
                <IconButton
                  icon={Icons.Edit}
                  onClick={() => handleEdit(category)}
                />
                <IconButton
                  icon={Icons.Remove}
                  onClick={() => handleClickDelete(category.id)}
                />
                {!category.categoryId && (
                  <IconButton
                    icon={Icons.Plus}
                    onClick={handleOpenSubcategories}
                  />
                )}
              </>
            )
          }
        ]}
        data={categories}
      />
    </AppFrame>
  )
}

export default CategoriesPage
