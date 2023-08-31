import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { FindUserData } from './types'

export class FindUser {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ username }: FindUserData) {
    const user = await this.usersRepository.find(username)

    if (!user) {
      throw new Error('User not found.')
    }

    return user
  }
}
