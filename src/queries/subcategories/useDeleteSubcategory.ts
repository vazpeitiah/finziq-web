import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { deleteSubcategory } from 'api/subcategories'
import { Subcategory } from 'models/Subcategory'
import { queryClient } from 'queries/queryClient'
import { QueryKeys } from 'utils/config'

const useDeleteSubcategory = () => {
  const { data, mutate, isSuccess, isError, isPending } = useMutation<
    AxiosResponse<Subcategory>,
    AxiosError<unknown>,
    string
  >({
    mutationFn: (id) => deleteSubcategory(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.subcategories.read, res.data.categoryId]
      })
    }
  })

  return { data, deleteCategory: mutate, isSuccess, isError, isPending }
}

export default useDeleteSubcategory
