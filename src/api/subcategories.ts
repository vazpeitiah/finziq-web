import { z } from 'zod'

import 'models/Category'
import {
  CreateSubcategoryDto,
  SubcategorySchema,
  UpdateSubcategoryDto
} from 'models/Subcategory'

import api from './api'

export const SUBCATEGORIES_URL = '/subcategories'

export const getSubcategories = async (categoryId: string) => {
  const res = await api.get(`${SUBCATEGORIES_URL}/category/${categoryId}`)
  return z.array(SubcategorySchema).parse(res.data)
}

export const createSubcategory = (data: CreateSubcategoryDto) => {
  return api.post(SUBCATEGORIES_URL, data)
}

export const updateSubcategory = (id: string, data: UpdateSubcategoryDto) => {
  return api.patch(`${SUBCATEGORIES_URL}/${id}`, data)
}

export const deleteSubcategory = (id: string) => {
  return api.delete(`${SUBCATEGORIES_URL}/${id}`)
}
