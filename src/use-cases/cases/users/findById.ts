import CaseError from '@/use-cases/errors/CaseError'
import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { FindByIdData } from './types'

export class FindById {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ id }: FindByIdData) {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new CaseError('User not found.', 404)
    }

    return {
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio,
      created_at: user.created_at,
    }
  }
}
