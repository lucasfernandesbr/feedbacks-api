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

    return user
  }
}
