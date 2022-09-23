import { IDeliveriesRepository } from '@modules/deliveries/repositories/IDeliveriesRepository'
import { Deliveries } from '@prisma/client'

interface IRequest {
  delivery_id: string
  deliveryman_id: string
}

export class AddDeliverymanUseCase {
  constructor(private readonly deliveriesRepository: IDeliveriesRepository) {}

  async execute({
    delivery_id,
    deliveryman_id,
  }: IRequest): Promise<Deliveries> {
    const delivery = await this.deliveriesRepository.addDeliveryman(
      delivery_id,
      deliveryman_id
    )

    if (delivery == null) {
      throw new Error('Delivery not found')
    }

    return delivery
  }
}
