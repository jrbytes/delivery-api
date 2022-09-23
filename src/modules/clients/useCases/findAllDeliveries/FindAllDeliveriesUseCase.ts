import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository'
import { Clients } from '@prisma/client'

export class FindAllDeliveriesUseCase {
  constructor (
    private readonly clientsRepository: IClientsRepository
  ) {}

  async execute (client_id: string): Promise<Clients | undefined> {
    const deliveries = await this.clientsRepository.findAllDeliveriesByClientId(client_id)

    if (deliveries == null) {
      throw new Error('Client not found')
    }

    return deliveries
  }
}
