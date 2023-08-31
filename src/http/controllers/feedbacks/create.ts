import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { feedbacksFactory } from '@/use-cases/factories/feedbacks'

export default async function createFeedback(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const feedbackSchema = z.object({
    receiving_feedback_username: z.string().nonempty(),
    giving_feedback_username: z.string().nonempty(),
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    type: z.enum(['keep', 'start', 'stop']),
  })

  const {
    receiving_feedback_username,
    giving_feedback_username,
    title,
    content,
    type,
  } = feedbackSchema.parse(request.body)

  const createFeedback = feedbacksFactory()

  const feedback = await createFeedback.execute({
    receiving_feedback_username,
    giving_feedback_username,
    title,
    content,
    type,
  })

  return reply.status(201).send(feedback)
}
