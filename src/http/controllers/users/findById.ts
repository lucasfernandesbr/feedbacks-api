import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UsersRepository } from '@/repositories/users'
import { FindById } from '@/use-cases/users/findById'

export default async function findById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    id: z.string(),
  })

  const usersRepository = new UsersRepository()
  const findUser = new FindById(usersRepository)

  const { id } = getUserSchema.parse(request.params)

  const user = await findUser.execute({
    id,
  })

  return reply.status(200).send(user)
}
