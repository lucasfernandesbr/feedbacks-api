import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import prisma from '@/api'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    id: z.string(),
  })

  const { id } = getUserSchema.parse(request.params)

  const feedback = await prisma.users.findMany({
    where: {
      id,
    },

    include: {
      feedbacks: true,
    },
  })

  return reply.status(200).send(feedback)
}
