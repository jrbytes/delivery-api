import { prisma } from '@database/prisma'
import { Clients, PrismaClient } from '@prisma/client'

import { ICreateClientDTO } from '../../../dtos/ICreateClienteDTO'
import { IClientsRepository } from '../../../repositories/IClientsRepository'

export class ClientsRepository implements IClientsRepository {
  private readonly repository: PrismaClient['clients']

  constructor () {
    this.repository = prisma.clients
  }

  async create (data: ICreateClientDTO): Promise<Clients> {
    const client = await this.repository.create({
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

  async findAllDeliveriesByClientId (client_id: string): Promise<Clients | undefined> {
    const clientWithDeliveries = await this.repository.findUniqueOrThrow({
      where: {
        id: client_id
      },
      include: {
        deliveries: true
      }
    })

    return clientWithDeliveries
  }
}
