import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { FeedbacksData } from './types'
import { FeedbacksRepositoryInterface } from '@/repositories/feedbacks/interface'

export class CreateFeedback {
  constructor(
    private feedbacksRepository: FeedbacksRepositoryInterface,
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute({
    receiving_feedback_username,
    giving_feedback_username,
    title,
    content,
    type,
  }: FeedbacksData) {
    const doesReceivingFeedbackUserExist =
      await this.usersRepository.findByUsername(receiving_feedback_username)

    if (!doesReceivingFeedbackUserExist) {
      throw new Error('User not found.')
    }

    const doesGivingFeedbackUserExist =
      await this.usersRepository.findByUsername(giving_feedback_username)

    if (!doesGivingFeedbackUserExist) {
      throw new Error('Pinned By User not found.')
    }

    const feedback = await this.feedbacksRepository.create({
      user_id: doesReceivingFeedbackUserExist.id,
      pinned_by: doesGivingFeedbackUserExist.id,
      title,
      content,
      type,
    })

    return feedback
  }
}
