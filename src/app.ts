import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const userSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(0),
})

app.post(
  '/users',
  zValidator('json', userSchema),
  (c) => {
    const user = c.req.valid('json')

    return c.json({
      message: 'User created',
      user,
    }, 201)
  }
)

export default app