import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { deleteCategory } from 'api/categories'
import { Category } from 'models/Category'
import { queryClient } from 'queries/queryClient'

import { QK_GET_CATEGORIES } from './useGetCategories'

const useDeleteCategory = () => {
  const { data, mutate, isSuccess, isError, isPending } = useMutation<
    AxiosResponse<Category>,
    AxiosError<unknown>,
    string
  >({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QK_GET_CATEGORIES, res.data.type]
      })
    }
  })

  return { data, deleteCategory: mutate, isSuccess, isError, isPending }
}

export default useDeleteCategory
