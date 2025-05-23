import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { createAccount } from 'api'
import { Account, CreateAccount } from 'models/Account'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'
import { QK_GET_ACCOUNTS } from 'queries/accounts/useGetAccounts'
import { queryClient } from 'queries/queryClient'

const useCreateAccount = () => {
  const alerts = useAlerts()
  const { data, isError, isSuccess, isPending, mutate, error } = useMutation<
    AxiosResponse<Account>,
    AxiosError<ErrorType>,
    CreateAccount
  >({
    mutationFn: (data) => createAccount(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QK_GET_ACCOUNTS]
      })
  })

  useEffect(() => {
    if (isError) {
      alerts.error(error.response?.data?.error ?? '')
    }
  }, [isError])

  return {
    data: data?.data,
    isError,
    isSuccess,
    isPending,
    createAccount: mutate
  }
}

export default useCreateAccount
