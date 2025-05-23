import { z } from 'zod'

import { AccountSchema, CreateAccount, UpdateAccount } from 'models/Account'

import api from './api'

export const ACCOUNTS_URL = '/accounts'

export const getAccounts = async () => {
  const res = await api.get(ACCOUNTS_URL)
  return z.array(AccountSchema).parse(res.data)
}

export const createAccount = (data: CreateAccount) => {
  return api.post(ACCOUNTS_URL, data)
}

export const deleteAccount = (id: string) => {
  return api.delete(`${ACCOUNTS_URL}/${id}`)
}

export const updateAccount = (id: string, data: UpdateAccount) => {
  return api.patch(`${ACCOUNTS_URL}/${id}`, data)
}
