import { z } from 'zod'

export const editTokenSchema = z.object({
  balance: z.string().min(1, 'Value is required!'),
})

export type EditTokenSchema = z.infer<typeof editTokenSchema>
