import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

import { getCategories } from 'api/categories'
import { useAlerts } from 'providers/AlertsProvider'
import { TransactionTypes } from 'utils/config'

export const QK_GET_CATEGORIES = 'categories'

const useGetCategories = (transactionType: TransactionTypes) => {
  const alerts = useAlerts()
  const { data, error, isError, isLoading, isSuccess, isPending, refetch } =
    useQuery({
      queryKey: [QK_GET_CATEGORIES, transactionType],
      queryFn: () => getCategories(transactionType),
      placeholderData: keepPreviousData
    })

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      alerts.error(`${QK_GET_CATEGORIES}: ${error.response?.data?.error}`)
    }
    if (isError && error instanceof ZodError) {
      const validationError = fromError(error)
      alerts.error(`${QK_GET_CATEGORIES}: ${validationError.message}`)
    }
  }, [isError])

  const getCategoryById = (id: string) => {
    return data?.find((category) => category.id && category.id === id)
  }

  return {
    categories: data ?? [],
    getCategoryById,
    error,
    isError,
    isLoading,
    isSuccess,
    isPending,
    refetch
  }
}

export default useGetCategories
