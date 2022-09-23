import { IDeliveriesRepository } from '@modules/deliveries/repositories/IDeliveriesRepository'
import { Deliveries } from '@prisma/client'

export class FindAllAvailableUseCase {
  constructor(private readonly deliveriesRepository: IDeliveriesRepository) {}

  async execute(): Promise<Deliveries[]> {
    const deliveries = await this.deliveriesRepository.findAllAvailable()

    return deliveries
  }
}
