import { FastifyInstance } from 'fastify'

import { create, find } from './controllers/users'

export async function appRoutes(app: FastifyInstance) {
  app.get('/health', () => ({
    ok: true,
  }))

  app.post('/users', create)
  app.get('/users/:username', find)

  // app.post('/feedbacks', createFeedback)
}
