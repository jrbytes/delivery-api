/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Clients } from '@prisma/client'

import { ICreateClientDTO } from '../../dtos/ICreateClienteDTO'
import { IClientsRepository } from '../IClientsRepository'

export class InMemoryClientsRepository implements IClientsRepository {
  clients: Clients[] = []

  async create (data: ICreateClientDTO): Promise<Clients> {
    const client = {
      ...data,
      id: 'id',
      created_at: new Date(),
      updated_at: new Date()
    } as Clients

    this.clients.push(client)

    return client
  }

  async findUnique (username: string): Promise<Clients | undefined> {
    const client = this.clients.find(client => client.username === username)

    return client
  }
}
