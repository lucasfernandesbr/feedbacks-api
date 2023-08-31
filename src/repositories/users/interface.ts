import { Prisma, Users } from '@prisma/client'

export type UsersRepositoryInterface = {
  create(data: Prisma.UsersCreateInput): Promise<Users>
  findByUsername(username: string): Promise<Users | null>
  findById(id: string): Promise<Users | null>
}
