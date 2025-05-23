import { useQuery } from '@tanstack/react-query'

import { getOneCategory } from 'api/categories'

export const QK_GET_ONE_CATEGORY = 'getOneCategory'

export const useGetOneCategory = (id: string) => {
  const { data, isSuccess, isLoading, isFetching, refetch, isError, error } =
    useQuery({
      queryKey: [QK_GET_ONE_CATEGORY, id],
      queryFn: () => getOneCategory(id)
    })
  return {
    category: data,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    isError,
    error
  }
}

export default useGetOneCategory
