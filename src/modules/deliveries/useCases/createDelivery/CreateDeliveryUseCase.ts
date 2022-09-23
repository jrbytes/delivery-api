import { Deliveries } from '@prisma/client'

import { IDeliveriesRepository } from '../../repositories/IDeliveriesRepository'

interface ICreateDelivery {
  item_name: string
  client_id: string
}

export class CreateDeliveryUseCase {
  constructor(private readonly deliveriesRepository: IDeliveriesRepository) {}

  async execute({
    item_name,
    client_id,
  }: ICreateDelivery): Promise<Deliveries> {
    const delivery = await this.deliveriesRepository.create({
      item_name,
      client_id,
    })

    return delivery
  }
}
