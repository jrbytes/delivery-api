import { prisma } from '@database/prisma'
import { Deliveries, PrismaClient } from '@prisma/client'

import { ICreateDeliveryDTO } from '../../../dtos/ICreateDeliveryDTO'
import { IDeliveriesRepository } from '../../../repositories/IDeliveriesRepository'

export class DeliveriesRepository implements IDeliveriesRepository {
  private readonly repository: PrismaClient['deliveries']

  constructor() {
    this.repository = prisma.deliveries
  }

  async create(data: ICreateDeliveryDTO): Promise<Deliveries> {
    const delivery = await this.repository.create({
      data,
    })

    return delivery
  }

  async findById(id: string): Promise<Deliveries | undefined> {
    const delivery = await this.repository.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return delivery
  }

  async findAllAvailable(): Promise<Deliveries[]> {
    const deliveries = await this.repository.findMany({
      where: {
        end_at: null,
        deliveryman_id: null,
      },
    })

    return deliveries
  }

  async addDeliveryman(
    delivery_id: string,
    deliveryman_id: string
  ): Promise<Deliveries | undefined> {
    const delivery = await this.repository.update({
      where: {
        id: delivery_id,
      },
      data: {
        deliveryman_id,
      },
    })

    return delivery
  }

  async addEndDate(
    delivery_id: string,
    deliveryman_id: string
  ): Promise<Deliveries | undefined> {
    const findDelivery = await this.repository.findFirst({
      where: {
        id: delivery_id,
        deliveryman_id,
      },
    })

    if (findDelivery == null) {
      return undefined
    }

    const delivery = await this.repository.update({
      where: {
        id: findDelivery.id,
      },
      data: {
        end_at: new Date(),
      },
    })

    return delivery
  }
}
