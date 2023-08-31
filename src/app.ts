import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'

import { env } from '@/env'
import CaseError from '@/use-cases/errors/CaseError'

import { appRoutes } from './http/routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof CaseError) {
    return reply.status(error.statusCode).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.register(appRoutes)
