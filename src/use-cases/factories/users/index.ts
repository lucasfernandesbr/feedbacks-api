import { UsersRepository } from '@/repositories/users'

import { FindByUsername } from '@/use-cases/cases/users/findByUsername'
import { FindById } from '@/use-cases/cases/users/findById'

export function usersFactory() {
  const usersRepository = new UsersRepository()

  const findByUsername = new FindByUsername(usersRepository)
  const findById = new FindById(usersRepository)

  return { findByUsername, findById }
}
