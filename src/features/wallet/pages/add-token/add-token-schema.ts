import { z } from 'zod'

export const addTokenSchema = z.object({
  name: z.string().min(1, 'Token is required!'),
  balance: z.string().min(1, 'Value is required!'),
})

export type AddTokenSchema = z.infer<typeof addTokenSchema>
