import { compare, hash } from 'bcryptjs'
import axios from 'axios'

import CaseError from '@/use-cases/errors/CaseError'
import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { AuthenticateData, GithubUser } from './types'

const api = axios.create({
  baseURL: 'https://api.github.com/users/',
})

export class Authenticate {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ username, password }: AuthenticateData) {
    const doesUserExist = await this.usersRepository.findByUsername(username)

    if (!doesUserExist) {
      throw new CaseError('User not found.', 404)
    }

    const passwordCompare = await compare(password, doesUserExist.password)

    if (!passwordCompare) {
      throw new CaseError('Incorrect password.', 401)
    }

    if (doesUserExist && passwordCompare) {
      return doesUserExist
    }

    const getGithubData: GithubUser = await api.get<GithubUser, GithubUser>(
      `https://api.github.com/users/${username}`,
    )

    if (!getGithubData) {
      throw new CaseError('Github user not found.', 404)
    }

    const { name, avatar_url, bio } = getGithubData.data
    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      username,
      password: passwordHash,
      avatar_url,
      bio,
    })

    return user
  }
}
