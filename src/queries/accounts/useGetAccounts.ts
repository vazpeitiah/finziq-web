import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { ZodError } from 'zod'

import { getAccounts } from 'api/accounts'
import { useAlerts } from 'providers/AlertsProvider'

export const QK_GET_ACCOUNTS = 'accounts'

const useGetAccounts = () => {
  const alerts = useAlerts()
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QK_GET_ACCOUNTS],
    queryFn: () => getAccounts()
  })

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      alerts.error(`${QK_GET_ACCOUNTS}, ${error.response?.data?.error}`)
      return
    }
    if (isError && error instanceof ZodError) {
      alerts.error(`${QK_GET_ACCOUNTS}, ${error.message}`)
      return
    }
  }, [isError])

  const getAccountById = (id: string) => {
    return data?.find((account) => account.id && account.id === id)
  }

  return {
    accounts: data ?? [],
    getAccountById,
    error,
    isSuccess,
    isError,
    isLoading
  }
}

export default useGetAccounts
