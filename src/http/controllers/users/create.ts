import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { UsersRepository } from '@/repositories/users'
import { Authenticate } from '@/use-cases/authenticate'

export default async function create(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const usersRepository = new UsersRepository()
  const authenticate = new Authenticate(usersRepository)

  const { username, password } = userSchema.parse(request.body)

  const user = await authenticate.execute({
    username,
    password,
  })

  return reply.status(200).send(user)
}
