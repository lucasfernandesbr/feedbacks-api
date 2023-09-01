import { FastifyInstance } from 'fastify'

import verifyJWT from './middlewares/verify-jwt'

import { createUser, findByUsername, findById } from './controllers/users'
import { createFeedback } from './controllers/feedbacks'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', () => ({
    ok: true,
  }))

  app.post('/session', createUser)

  app.get('/users/username/:username', findByUsername)
  app.get('/users/id/:id', { onRequest: [verifyJWT] }, findById)

  app.post('/feedbacks', { onRequest: [verifyJWT] }, createFeedback)
}
