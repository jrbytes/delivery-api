import { IDeliveriesByDeliverymanDTO } from '@modules/deliveryman/dtos/IDeliveriesByDeliverymanDTO'
import { IDeliverymanRepository } from '@modules/deliveryman/repositories/IDeliverymanRepository'

export class FindAllDeliveriesUseCase {
  constructor(private readonly deliverymanRepository: IDeliverymanRepository) {}

  async execute(
    deliveryman_id: string
  ): Promise<IDeliveriesByDeliverymanDTO | undefined> {
    const deliverymanWithDeliveries =
      await this.deliverymanRepository.findAllDeliveriesByDeliverymanId(
        deliveryman_id
      )

    if (deliverymanWithDeliveries == null) {
      throw new Error('Deliveryman not found')
    }

    return deliverymanWithDeliveries
  }
}
