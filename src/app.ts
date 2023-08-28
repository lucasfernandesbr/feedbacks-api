import fastify from 'fastify'
import cors from '@fastify/cors'

import createUser from '@/controllers/users/create'
import getUser from '@/controllers/users/find'

import createFeedback from '@/controllers/feedbacks/create'
import listFeedbacks from '@/controllers/feedbacks/list'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET'],
})

app.get('/health', () => ({
  ok: true,
}))

app.post('/users', createUser)
app.get('/users/:id', getUser)

app.post('/feedbacks', createFeedback)
app.get('/feedbacks/:userId', listFeedbacks)
