import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UsersRepository } from '@/repositories/users'
import { FindUser } from '@/use-cases/users/find'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserSchema = z.object({
    username: z.string(),
  })

  const usersRepository = new UsersRepository()
  const findUser = new FindUser(usersRepository)

  const { username } = getUserSchema.parse(request.params)

  const user = await findUser.execute({
    username,
  })

  return reply.status(200).send(user)
}
