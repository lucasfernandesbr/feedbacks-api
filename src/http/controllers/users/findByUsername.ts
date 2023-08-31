import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { usersFactory } from '@/use-cases/factories/users'

export default async function findByUsername(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    username: z.string(),
  })

  const { findByUsername } = usersFactory()

  const { username } = getUserSchema.parse(request.params)

  const user = await findByUsername.execute({
    username,
  })

  return reply.status(200).send(user)
}
