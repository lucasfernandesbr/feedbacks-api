import { Prisma, Users } from '@prisma/client'

export type Feedback = {
  id: string
  user_id: string
  pinned_by: string
  title: string
  content: string
  type: string
  created_at: Date
}
export interface FindByUsername extends Users {
  feedbacks: Feedback[]
}

export type UsersRepositoryInterface = {
  create(data: Prisma.UsersCreateInput): Promise<Users>
  findByUsername(username: string): Promise<FindByUsername | null>
  findById(id: string): Promise<Users | null>
}
