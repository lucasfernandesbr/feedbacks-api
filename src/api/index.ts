import fastify from 'fastify'

import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET'],
})

app.get('/', () => ({
  ok: true,
}))
