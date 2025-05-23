import {
  CreateCategoryDto,
  UpdateCategoryDto,
  categorySchema
} from 'models/Category'
import { TransactionTypes } from 'utils/config'

import api from './api'

export const CATEGORIES_URL = '/categories'
export const CATEGORIES_TYPES_URL = '/categories/types'

export const getCategories = async (transactionType: TransactionTypes) => {
  const res = await api.get(`${CATEGORIES_TYPES_URL}/${transactionType}`)
  return categorySchema.array().parse(res.data)
}

export const getOneCategory = async (id: string) => {
  const res = await api.get(`${CATEGORIES_URL}/${id}`)
  return categorySchema.parse(res.data)
}

export const createCategory = (data: CreateCategoryDto) => {
  return api.post(CATEGORIES_URL, data)
}

export const updateCategory = (id: string, data: UpdateCategoryDto) => {
  return api.patch(`${CATEGORIES_URL}/${id}`, data)
}

export const deleteCategory = (id: string) => {
  return api.delete(`${CATEGORIES_URL}/${id}`)
}
