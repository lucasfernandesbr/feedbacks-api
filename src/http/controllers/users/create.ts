import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { authenticateFactory } from '@/use-cases/factories/authenticate'

export default async function createUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = userSchema.parse(request.body)

  const authenticate = authenticateFactory()

  const user = await authenticate.execute({
    username,
    password,
  })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    },
  )

  return reply.status(200).send({ user, token })
}
