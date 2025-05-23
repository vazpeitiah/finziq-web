import { SelectOption } from './types'

export const ROUTES = {
  home: '/',
  accounts: {
    root: '/accounts',
    add: '/accounts/add',
    edit: '/accounts/edit'
  },
  categories: {
    root: '/categories',
    add: '/categories/add',
    edit: '/categories/edit'
  }
}

export const API_URL = import.meta.env.VITE_API_URL

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export const TransactionTypesOptions: SelectOption[] = [
  { value: TransactionTypes.INCOME, label: 'transactionTypes.incomes' },
  { value: TransactionTypes.EXPENSE, label: 'transactionTypes.expenses' },
  { value: TransactionTypes.TRANSFER, label: 'transactionTypes.transfers' }
]

export const DateFormats = {
  short: 'DD/MM/YYYY',
  long: 'DD/MM/YYYY HH:mm:ss'
}

export const QueryKeys = {
  subcategories: {
    read: 'subcategories',
    create: 'createSubcategory'
  }
}
