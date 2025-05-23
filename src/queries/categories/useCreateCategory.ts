import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { createCategory } from 'api/categories'
import { Category, CreateCategoryDto } from 'models/Category'
import { queryClient } from 'queries/queryClient'

import { QK_GET_CATEGORIES } from './useGetCategories'

const useCreateCategory = () => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation<
    AxiosResponse<Category>,
    AxiosError<unknown>,
    CreateCategoryDto
  >({
    mutationFn: (data) => createCategory(data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: [QK_GET_CATEGORIES, vars.type]
      })
    }
  })

  return { data, isSuccess, isError, isPending, createCategory: mutate }
}

export default useCreateCategory
