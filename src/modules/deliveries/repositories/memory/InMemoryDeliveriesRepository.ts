/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Deliveries } from '@prisma/client'

import { ICreateDeliveryDTO } from '../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../IDeliveriesRepository'

export class InMemoryDeliveriesRepository implements IDeliveriesRepository {
  deliveries: Deliveries[] = []

  async create (data: ICreateDeliveryDTO): Promise<Deliveries> {
    const deliveries = {
      ...data,
      id: 'id',
      created_at: new Date(),
      updated_at: new Date()
    } as Deliveries

    this.deliveries.push(deliveries)

    return deliveries
  }

  async findById (id: string): Promise<Deliveries | undefined> {
    const delivery = this.deliveries.find(delivery => delivery.id === id)

    return delivery
  }
}
