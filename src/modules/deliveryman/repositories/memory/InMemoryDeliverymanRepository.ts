/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Deliveryman } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../../dtos/ICreateDeliverymanDTO'
import { IDeliverymanRepository } from '../IDeliverymanRepository'

export class InMemoryDeliverymanRepository implements IDeliverymanRepository {
  deliveryman: Deliveryman[] = []

  async create (data: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliveryman = {
      ...data,
      id: 'id',
      created_at: new Date(),
      updated_at: new Date()
    } as Deliveryman

    this.deliveryman.push(deliveryman)

    return deliveryman
  }

  async findUnique (username: string): Promise<Deliveryman | undefined> {
    const deliveryman = this.deliveryman.find(
      deliveryman => deliveryman.username === username
    )

    return deliveryman
  }
}
