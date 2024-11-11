import { ZodIssue } from 'zod'

type ActionResult<T> =
  | { id?: string; status: 'success'; data: T }
  | { status: 'error'; error: string | ZodIssue[] }
