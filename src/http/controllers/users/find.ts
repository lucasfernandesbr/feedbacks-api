import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import prisma from '@/lib/prisma'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    username: z.string(),
  })

  const { username } = getUserSchema.parse(request.params)

  const user = await prisma.users.findFirst({
    where: {
      username,
    },

    include: {
      feedbacks: true,
    },
  })

  return reply.status(200).send(user)
}
