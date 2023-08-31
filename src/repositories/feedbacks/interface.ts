import { Feedbacks } from '@prisma/client'

export type FeedbackData = {
  user_id: string
  pinned_by: string
  title: string
  content: string
  type: 'keep' | 'start' | 'stop'
}

export type FeedbacksRepositoryInterface = {
  create(data: FeedbackData): Promise<Feedbacks>
}
