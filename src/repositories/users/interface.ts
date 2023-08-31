import { Prisma, Users } from '@prisma/client'

export type UsersRepositoryInterface = {
  create(data: Prisma.UsersCreateInput): Promise<Users>
  find(username: string): Promise<Users | null>
}
