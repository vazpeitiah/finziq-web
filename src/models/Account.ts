import z from 'zod'

export enum AccountType {
  Cash = 'CASH',
  Bank = 'BANK',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  Investment = 'INVESTMENT',
  Other = 'OTHER'
}

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string(),
  includeInTotal: z.boolean(),
  active: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  type: z.nativeEnum(AccountType),
  userId: z.string()
})

export const CreateAccountSchema = z.object({
  name: z.string().min(1, 'validations.required'),
  type: z.string().min(1, 'validations.required'),
  includeInTotal: z.boolean().nullish(),
  userId: z.string().nullish()
})

export const UpdateAccountSchema = CreateAccountSchema.partial()

export type Account = z.infer<typeof AccountSchema>
export type CreateAccount = z.infer<typeof CreateAccountSchema>
export type UpdateAccount = z.infer<typeof UpdateAccountSchema>
