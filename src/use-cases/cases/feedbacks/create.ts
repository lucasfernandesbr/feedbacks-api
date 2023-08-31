import { UsersRepositoryInterface } from '@/repositories/users/interface'

import CaseError from '@/use-cases/errors/CaseError'
import { FeedbacksRepositoryInterface } from '@/repositories/feedbacks/interface'

import { FeedbacksData } from './types'

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
      throw new CaseError('User not found.', 404)
    }

    const doesGivingFeedbackUserExist =
      await this.usersRepository.findByUsername(giving_feedback_username)

    if (!doesGivingFeedbackUserExist) {
      throw new CaseError('Pinned By User not found.', 404)
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
