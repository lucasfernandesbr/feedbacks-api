import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import prisma from '@/api'

export default async function execute(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    avatarUrl: z.string(),
    location: z.string(),
    bio: z.string(),
  })

  const { name, username, avatarUrl, location, bio } = userSchema.parse(
    request.body,
  )

  const user = await prisma.users.create({
    data: {
      name,
      username,
      avatar_url: avatarUrl,
      location,
      bio,
    },
  })

  return reply.status(201).send(user)
}
