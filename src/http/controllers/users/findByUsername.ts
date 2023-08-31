import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UsersRepository } from '@/repositories/users'
import { FindByUsername } from '@/use-cases/users/findByUsername'

export default async function findByUsername(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    username: z.string(),
  })

  const usersRepository = new UsersRepository()
  const findUser = new FindByUsername(usersRepository)

  const { username } = getUserSchema.parse(request.params)

  const user = await findUser.execute({
    username,
  })

  return reply.status(200).send(user)
}
