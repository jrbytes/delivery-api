import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { prisma } from '../../../database/prisma/prismaClient'

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute ({ password, username }: IAuthenticateClient): Promise<string> {
    const messageError = 'Username or password incorrect'

    const client = await prisma.clients.findUnique({
      where: {
        username
      }
    })

    if (client == null) {
      throw new Error(messageError)
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error(messageError)
    }

    const token = sign({ username }, 'secret', {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}
