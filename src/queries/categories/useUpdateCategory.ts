import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { updateCategory } from 'api/categories'
import { Category, UpdateCategoryDto } from 'models/Category'
import { queryClient } from 'queries/queryClient'

import { QK_GET_CATEGORIES } from './useGetCategories'

interface UpdateCategoryParams {
  id: string
  body: UpdateCategoryDto
}

const useUpdateCategory = () => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation<
    AxiosResponse<Category>,
    AxiosError<unknown>,
    UpdateCategoryParams
  >({
    mutationFn: (data) => updateCategory(data.id, data.body),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: [QK_GET_CATEGORIES, vars.body.type]
      })
    }
  })

  return { data, isSuccess, isError, isPending, updateCategory: mutate }
}

export default useUpdateCategory
