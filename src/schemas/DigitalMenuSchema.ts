import { z } from 'zod'

export const createDigitalMenuSchema = z.object({
  photo: z.string().min(1, { message: 'Insira a foto' }),
  title: z.string().min(1, { message: 'Preencha o título' }),
  price: z.coerce.number().positive({ message: 'O preço deve ser positivo' }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: 'Preencha a quantidade' }),
  calories: z.coerce.number().int().min(1, { message: 'Preencha a caloria' }),
  stock: z.coerce.number().int().min(1, { message: 'Preencha o estoque' }),
  status: z.enum(['ACTIVATED', 'DEACTIVATED'], {
    message: 'Selecione um status válido',
  }),
})

export type CreateDigitalMenuSchema = z.infer<typeof createDigitalMenuSchema>
