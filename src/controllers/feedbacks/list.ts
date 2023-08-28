import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import prisma from '@/api'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const feedbackSchema = z.object({
    userId: z.string(),
  })

  const { userId } = feedbackSchema.parse(request.params)

  const feedback = await prisma.feedbacks.findMany({
    where: {
      user_id: userId,
    },
  })

  return reply.status(200).send(feedback)
}
