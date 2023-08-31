import { compare, hash } from 'bcryptjs'
import axios from 'axios'

import { UsersRepositoryInterface } from '@/repositories/users/interface'

import { AuthenticateData, GithubUser } from './types'

const api = axios.create({
  baseURL: 'https://api.github.com/users/',
})

export class Authenticate {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ username, password }: AuthenticateData) {
    const doesUserExist = await this.usersRepository.find(username)

    if (doesUserExist) {
      const passwordHash = await compare(password, doesUserExist.password)

      if (!passwordHash) {
        throw new Error('Incorrect password.')
      }

      return doesUserExist
    }

    const getGithubData: GithubUser = await api.get<GithubUser, GithubUser>(
      `https://api.github.com/users/${username}`,
    )

    if (!getGithubData) {
      throw new Error('Github user not found.')
    }
    console.log(getGithubData.data)

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
