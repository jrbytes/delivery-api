import { IDeliveriesByDeliverymanDTO } from '@modules/deliveryman/dtos/IDeliveriesByDeliverymanDTO'
import { Deliveryman } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../../dtos/ICreateDeliverymanDTO'
import { IDeliverymanRepository } from '../IDeliverymanRepository'

let deliveryman: Deliveryman

export class InMemoryDeliverymanRepository implements IDeliverymanRepository {
  deliveryman: Deliveryman[] = []

  async create(data: ICreateDeliverymanDTO): Promise<Deliveryman> {
    deliveryman = {
      ...data,
      id: 'id',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.deliveryman.push(deliveryman)

    return deliveryman
  }

  async findUnique(username: string): Promise<Deliveryman | undefined> {
    const deliveryman = this.deliveryman.find(
      (deliveryman) => deliveryman.username === username
    )

    return deliveryman
  }

  async findAllDeliveriesByDeliverymanId(
    deliveryman_id: string
  ): Promise<IDeliveriesByDeliverymanDTO | undefined> {
    const deliveryman = this.deliveryman.find(
      (deliveryman) => deliveryman.id === deliveryman_id
    )

    if (deliveryman == null) {
      return undefined
    }

    const parsedDeliveryman = {
      id: deliveryman.id,
      username: deliveryman.username,
      deliveries: [],
    }

    return parsedDeliveryman
  }
}
