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

    const feedbacks = user.feedbacks.map(
      ({ title, content, type, created_at }) => {
        return { title, content, type, created_at }
      },
    )

    return {
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio,
      created_at: user.created_at,
      feedbacks,
    }
  }
}
