import { IDeliveriesByClientDTO } from '@modules/clients/dtos/IDeliveriesByClientDTO'
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository'

export class FindAllDeliveriesUseCase {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async execute(
    client_id: string
  ): Promise<IDeliveriesByClientDTO | undefined> {
    const clientWithDeliveries =
      await this.clientsRepository.findAllDeliveriesByClientId(client_id)

    if (clientWithDeliveries == null) {
      throw new Error('Client not found')
    }

    return clientWithDeliveries
  }
}
