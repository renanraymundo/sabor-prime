import { z } from 'zod'

export const digitalMenuSchema = z.object({
  photo: z.string().min(1, { message: 'Insira a foto' }),
  title: z.string().min(1, { message: 'Preencha o título' }),
  price: z
    .string()
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: 'Preencha o valor unitário',
    })
    .transform((value) => parseFloat(value)),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: 'Preencha a quantidade' }),
  calories: z.coerce.number().int().min(1, { message: 'Preencha a caloria' }),
  stock: z.coerce.number().int().min(1, { message: 'Preencha o estoque' }),
  status: z.enum(['ACTIVATED', 'DEACTIVATED'], {
    message: 'Selecione o status',
  }),
  lineId: z.string().min(1, { message: 'Selecione a linha' }),
})

export type DigitalMenuSchema = z.infer<typeof digitalMenuSchema>
