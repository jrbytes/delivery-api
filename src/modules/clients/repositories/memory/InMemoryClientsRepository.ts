import { IDeliveriesByClientDTO } from '@modules/clients/dtos/IDeliveriesByClientDTO'
import { Clients } from '@prisma/client'

import { ICreateClientDTO } from '../../dtos/ICreateClienteDTO'
import { IClientsRepository } from '../IClientsRepository'

let client: Clients

export class InMemoryClientsRepository implements IClientsRepository {
  clients: Clients[] = []

  async create(data: ICreateClientDTO): Promise<Clients> {
    client = {
      ...data,
      id: 'id',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.clients.push(client)

    return client
  }

  async findUnique(username: string): Promise<Clients | undefined> {
    const client = this.clients.find((client) => client.username === username)

    return client
  }

  async findAllDeliveriesByClientId(
    client_id: string
  ): Promise<IDeliveriesByClientDTO | undefined> {
    const client = this.clients.find((client) => client.id === client_id)

    if (client == null) {
      return undefined
    }

    const parsedClient = {
      id: client.id,
      username: client.username,
      deliveries: [],
    }

    return parsedClient
  }
}
