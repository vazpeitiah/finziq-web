import { z } from 'zod'

export const baseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string().optional(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.string().optional()
})

export type Category = z.infer<typeof baseCategorySchema> & {
  subcategories?: Category[]
}

export const categorySchema: z.ZodSchema<Category> = baseCategorySchema.extend({
  subcategories: z.lazy(() => categorySchema.array()).optional()
})

export const CreateCategorySchema = z.object({
  name: z.string().min(1, 'validations.required'),
  type: z.string()
})

export const UpdateCategorySchema = CreateCategorySchema.partial()

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>
