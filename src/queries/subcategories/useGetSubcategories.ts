import { useQuery } from '@tanstack/react-query'

import { getSubcategories } from 'api/subcategories'
import { QueryKeys } from 'utils/config'

const useGetSubcategories = (categoryId?: string) => {
  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery({
    enabled: !!categoryId,
    queryKey: [QueryKeys.subcategories.read, categoryId],
    queryFn: () => getSubcategories(categoryId as string)
  })
  return {
    subcategories: data ?? [],
    isSuccess,
    isLoading,
    isError,
    error,
    refetch
  }
}

export default useGetSubcategories
