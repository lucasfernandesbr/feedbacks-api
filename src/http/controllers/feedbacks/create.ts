import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import prisma from '@/lib/prisma'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const feedbackSchema = z.object({
    userId: z.string(),
    pinnedBy: z.string(),
    content: z.string(),
    type: z.string(),
  })

  const { userId, pinnedBy, content, type } = feedbackSchema.parse(request.body)

  const feedback = await prisma.feedbacks.create({
    data: {
      user_id: userId,
      pinned_by: pinnedBy,
      content,
      type,
    },
  })

  return reply.status(201).send(feedback)
}
