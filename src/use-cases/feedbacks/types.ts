export type FeedbacksData = {
  receiving_feedback_username: string
  giving_feedback_username: string
  title: string
  content: string
  type: 'keep' | 'start' | 'stop'
}
