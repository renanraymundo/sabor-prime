import { z } from 'zod'

export const digitalMenuLineSchema = z.object({
  title: z.string().min(1, { message: 'Preencha o título' }),
})

export type DigitalMenuLineSchema = z.infer<typeof digitalMenuLineSchema>
