import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { createSubcategory } from 'api/subcategories'
import { CreateSubcategoryDto, Subcategory } from 'models/Subcategory'
import { queryClient } from 'queries/queryClient'
import { QueryKeys } from 'utils/config'

const useCreateSubcategory = () => {
  const { data, isSuccess, isError, isPending, mutate } = useMutation<
    AxiosResponse<Subcategory>,
    AxiosError<unknown>,
    CreateSubcategoryDto
  >({
    mutationFn: (data) => createSubcategory(data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.subcategories.create, vars.categoryId]
      })
    }
  })

  return { data, isSuccess, isError, isPending, createSubcategory: mutate }
}

export default useCreateSubcategory
