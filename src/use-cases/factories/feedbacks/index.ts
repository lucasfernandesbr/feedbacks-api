import { UsersRepository } from '@/repositories/users'
import { FeedbacksRepository } from '@/repositories/feedbacks'

import { CreateFeedback } from '@/use-cases/cases/feedbacks/create'

export function feedbacksFactory() {
  const feedbacksRepository = new FeedbacksRepository()
  const usersRepository = new UsersRepository()

  const createFeedback = new CreateFeedback(
    feedbacksRepository,
    usersRepository,
  )

  return createFeedback
}
