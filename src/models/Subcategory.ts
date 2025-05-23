import { z } from 'zod'

import { baseCategorySchema } from './Category'

export const SubcategorySchema = baseCategorySchema.extend({
  categoryId: z.string(),
  type: z.string().optional()
})

export const CreateSubcategorySchema = z.object({
  name: z.string().min(1, 'validations.required'),
  categoryId: z.string()
})

export const UpdateSubcategorySchema = CreateSubcategorySchema.partial()

export type Subcategory = z.infer<typeof SubcategorySchema>
export type CreateSubcategoryDto = z.infer<typeof CreateSubcategorySchema>
export type UpdateSubcategoryDto = z.infer<typeof UpdateSubcategorySchema>
