import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { UsersRepositoryInterface } from './interface'

export class UsersRepository implements UsersRepositoryInterface {
  async create(data: Prisma.UsersCreateInput) {
    const user = await prisma.users.create({
      data,
      include: {
        feedbacks: true,
      },
    })

    return user
  }

  async findByUsername(username: string) {
    const user = await prisma.users.findFirst({
      where: { username },
      include: {
        feedbacks: true,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.users.findFirst({
      where: { id },
      include: {
        feedbacks: true,
      },
    })

    return user
  }
}
