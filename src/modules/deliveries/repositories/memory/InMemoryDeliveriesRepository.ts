import { Deliveries } from '@prisma/client'

import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../IDeliveriesRepository'

let delivery: Deliveries

export class InMemoryDeliveriesRepository implements IDeliveriesRepository {
  deliveries: Deliveries[] = []

  async create (data: ICreateDeliveryDTO): Promise<Deliveries> {
    delivery = {
      ...data,
      id: 'id',
      deliveryman_id: null,
      item_name: 'item_name',
      end_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.deliveries.push(delivery)

    return delivery
  }

  async findById (id: string): Promise<Deliveries | undefined> {
    const delivery = this.deliveries.find(delivery => delivery.id === id)

    return delivery
  }

  async findAllAvailable (): Promise<Deliveries[]> {
    const deliveries = this.deliveries.filter(delivery => delivery.end_at === null)

    return deliveries
  }
}
