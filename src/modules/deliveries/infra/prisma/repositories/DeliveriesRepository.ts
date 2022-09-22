import { prisma } from '@database/prisma'
import { Deliveries, PrismaClient } from '@prisma/client'

import { ICreateDeliveryDTO } from '../../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../../../repositories/IDeliveriesRepository'

export class DeliveriesRepository implements IDeliveriesRepository {
  private readonly repository: PrismaClient['deliveries']

  constructor () {
    this.repository = prisma.deliveries
  }

  async create (data: ICreateDeliveryDTO): Promise<Deliveries> {
    const delivery = await this.repository.create({
      data
    })

    return delivery
  }

  async findById (id: string): Promise<Deliveries | undefined> {
    const delivery = await this.repository.findUniqueOrThrow({
      where: {
        id
      }
    })

    return delivery
  }
}
