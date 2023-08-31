import { UsersRepository } from '@/repositories/users'

import { Authenticate } from '@/use-cases/cases/authenticate'

export function authenticateFactory() {
  const usersRepository = new UsersRepository()

  const authenticate = new Authenticate(usersRepository)

  return authenticate
}
