import { Deliveries } from '@prisma/client'

import { IDeliveriesRepository } from '../../repositories/IDeliveriesRepository'

interface IRequest {
  id: string
}

export class ShowDeliveryUseCase {
  constructor(private readonly deliveriesRepository: IDeliveriesRepository) {}

  async execute({ id }: IRequest): Promise<Deliveries | undefined> {
    const delivery = await this.deliveriesRepository.findById(id)

    return delivery
  }
}
