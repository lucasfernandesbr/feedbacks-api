import CaseError from '@/use-cases/errors/CaseError'
import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { FindByUsernameData } from './types'

export class FindByUsername {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ username }: FindByUsernameData) {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      throw new CaseError('User not found.', 404)
    }

    return user
  }
}
