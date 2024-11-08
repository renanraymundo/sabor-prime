import { z } from 'zod'

export const createDigitalMenuOrderSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Preencha seu nome completo' })
    .regex(/^[\wÀ-ÿ]+\s+[\wÀ-ÿ]+/, { message: 'Insira um sobrenome' }),
  whatsapp: z
    .string()
    .min(1, { message: 'Preencha seu WhatsApp' })
    .refine((value) => /^\(\d{2}\) \d{5}-\d{4}$/.test(value), {
      message: 'O WhatsApp tem um formato inválido',
    })
    .transform((value) => value.replace(/\D/g, '').slice(0, 11)),
  address: z.string().min(1, { message: 'Preencha seu endereço' }),
  complement: z.string(),
  city: z.string().min(1, { message: 'Preencha sua cidade' }),
})

export type CreateDigitalMenuOrderSchema = z.infer<
  typeof createDigitalMenuOrderSchema
>

export const updateDigitalMenuOrderSchema = z.object({
  status: z.enum(['CANCELLED', 'INPROCESS', 'COMPLETED']),
})

export type UpdateDigitalMenuOrderSchema = z.infer<
  typeof updateDigitalMenuOrderSchema
>
