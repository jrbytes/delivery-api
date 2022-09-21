import { Clients, PrismaClient } from '@prisma/client'

import { prisma } from '../../../../../database/prisma/prismaClient'
import { ICreateClientDTO } from '../../../dtos/ICreateClienteDTO'
import { IClientsRepository } from '../../../repositories/IClientsRepository'

export class ClientsRepository implements IClientsRepository {
  private readonly repository: PrismaClient['clients']

  constructor () {
    this.repository = prisma.clients
  }

  async create (data: ICreateClientDTO): Promise<Clients> {
    const client = await prisma.clients.create({
      data
    })

    return client
  }

  async findUnique (username: string): Promise<Clients | undefined> {
    const client = await this.repository.findUnique({
      where: {
        username
      }
    })

    return client === null ? undefined : client
  }
}
