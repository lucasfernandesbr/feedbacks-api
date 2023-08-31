import { FastifyInstance } from 'fastify'

import { createUser, findByUsername, findById } from './controllers/users'
import { createFeedback } from './controllers/feedbacks'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', () => ({
    ok: true,
  }))

  app.post('/users', createUser)
  app.get('/users/username/:username', findByUsername)
  app.get('/users/id/:id', findById)

  app.post('/feedbacks', createFeedback)
}
