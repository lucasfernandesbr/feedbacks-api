import fastify from 'fastify'
import cors from '@fastify/cors'

import CaseError from '@/use-cases/errors/CaseError'

import { appRoutes } from './http/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST'],
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
