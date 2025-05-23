import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, CheckBox, Select, TextField } from 'components'
import AppFrame from 'frames/AppFrame'
import {
  Account,
  AccountType,
  CreateAccount,
  CreateAccountSchema
} from 'models/Account'
import useCreateAccount from 'queries/accounts/useCreateAccount'
import useUpdateAccount from 'queries/accounts/useUpdateAccount'

const defaultValues: CreateAccount = {
  type: AccountType.Cash,
  includeInTotal: true,
  name: '',
  userId: '07e4a348-7b1f-415b-8d4c-4e751836a547'
}

const AccountForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { createAccount, isSuccess } = useCreateAccount()
  const { updateAccount, isSuccess: isSuccessUpdated } = useUpdateAccount()
  const selectedAccount = location.state as Account
  const isUpdate = !!selectedAccount
  const { control, reset, handleSubmit } = useForm<CreateAccount>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: defaultValues
  })

  const accountTypes = Object.values(AccountType).map((type) => ({
    label: t(`accounts.catalogType.${type}`),
    value: type
  }))

  useEffect(() => {
    if (isSuccess || isSuccessUpdated) {
      reset()
      navigate(-1)
    }
  }, [isSuccess, isSuccessUpdated])

  useEffect(() => {
    if (selectedAccount) {
      reset(selectedAccount)
    } else {
      reset(defaultValues)
    }
  }, [selectedAccount?.id])

  const handleOnSubmit: SubmitHandler<CreateAccount> = (account) => {
    if (isUpdate) {
      updateAccount({ id: selectedAccount.id, body: account })
    } else {
      createAccount(account)
    }
  }

  const handleReset = () => {
    reset()
    navigate(-1)
  }

  return (
    <AppFrame>
      <form className="flex flex-col" onSubmit={handleSubmit(handleOnSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              id={field.name}
              label={t('accounts.name')}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(value as string)}
              showError={!!error}
              error={error?.message ? t(error.message) : undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => (
            <Select
              id={field.name}
              label={t('accounts.type')}
              options={accountTypes}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(value as string)}
              showError={!!error}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="includeInTotal"
          render={({ field }) => (
            <CheckBox
              id={field.name}
              name={field.name}
              label={t('accounts.includeInTotal')}
              checked={field.value as boolean}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex justify-between gap-4 self-center w-full">
          <Button variant="outline" onClick={handleReset} className="grow">
            {t('buttons.cancel')}
          </Button>
          <Button type="submit" className="grow">
            {isUpdate ? t('buttons.update') : t('buttons.save')}
          </Button>
        </div>
      </form>
    </AppFrame>
  )
}

export default AccountForm
