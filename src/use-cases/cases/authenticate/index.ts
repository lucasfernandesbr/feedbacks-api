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
      const feedbacks = doesUserExist.feedbacks.map(
        ({ title, content, type, created_at }) => {
          return { title, content, type, created_at }
        },
      )

      return {
        name: doesUserExist.name,
        username: doesUserExist.username,
        avatar_url: doesUserExist.avatar_url,
        bio: doesUserExist.bio,
        created_at: doesUserExist.created_at,
        feedbacks,
      }
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

    return {
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio,
      created_at: user.created_at,
    }
  }
}
