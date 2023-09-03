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
export interface ResponseUser extends Users {
  feedbacks: Feedback[]
}

export type UsersRepositoryInterface = {
  create(data: Prisma.UsersCreateInput): Promise<ResponseUser>
  findByUsername(username: string): Promise<ResponseUser | null>
  findById(id: string): Promise<Users | null>
}
