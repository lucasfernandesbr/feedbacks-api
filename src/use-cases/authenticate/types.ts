export type AuthenticateData = {
  username: string
  password: string
}

export type GithubUser = {
  data: {
    name: string
    login: string
    avatar_url: string
    bio: string
  }
}
