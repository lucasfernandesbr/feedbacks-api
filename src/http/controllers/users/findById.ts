import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { usersFactory } from '@/use-cases/factories/users'

export default async function findById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    id: z.string(),
  })

  const { findById } = usersFactory()

  const { id } = getUserSchema.parse(request.params)

  const user = await findById.execute({
    id,
  })

  return reply.status(200).send(user)
}
