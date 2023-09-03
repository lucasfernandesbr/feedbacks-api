import prisma from '@/lib/prisma'

import { FeedbacksRepositoryInterface, FeedbackData } from './interface'

export class FeedbacksRepository implements FeedbacksRepositoryInterface {
  async create(data: FeedbackData) {
    const feedback = await prisma.feedbacks.create({
      data,
    })

    return feedback
  }
}
