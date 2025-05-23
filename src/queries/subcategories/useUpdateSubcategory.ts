import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { updateSubcategory } from 'api/subcategories'
import { Subcategory, UpdateSubcategoryDto } from 'models/Subcategory'
import { queryClient } from 'queries/queryClient'
import { QueryKeys } from 'utils/config'

interface UpdateSubcategoryParams {
  id: string
  body: UpdateSubcategoryDto
}

const useUpdateSubcategory = () => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation<
    AxiosResponse<Subcategory>,
    AxiosError<unknown>,
    UpdateSubcategoryParams
  >({
    mutationFn: (data) => updateSubcategory(data.id, data.body),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.subcategories.read, vars.body.categoryId]
      })
    }
  })

  return { data, isSuccess, isError, isPending, updateSubcategory: mutate }
}

export default useUpdateSubcategory
