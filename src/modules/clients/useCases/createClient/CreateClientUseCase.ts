import { hash } from 'bcrypt'

import { Clients } from '@prisma/client'

import { ICreateClientDTO } from '../../dtos/ICreateClienteDTO'
import { IClientsRepository } from '../../repositories/IClientsRepository'

export class CreateClientUseCase {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async execute({ password, username }: ICreateClientDTO): Promise<Clients> {
    const clientExists = await this.clientsRepository.findUnique(username)

    if (clientExists != null) {
      throw new Error('Client already exists')
    }

    const hashPassword = await hash(password, 10)

    const client = await this.clientsRepository.create({
      username,
      password: hashPassword,
    })

    return client
  }
}
