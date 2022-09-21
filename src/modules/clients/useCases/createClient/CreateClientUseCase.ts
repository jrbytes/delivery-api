import { hash } from 'bcrypt'

import { Clients } from '@prisma/client'

import { prisma } from '../../../../database/prisma/prismaClient'

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute ({ password, username }: ICreateClient): Promise<Clients> {
    const clientExists = await prisma.clients.findUnique({
      where: {
        username
      }
    })

    if (clientExists != null) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(password, 10)

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}
