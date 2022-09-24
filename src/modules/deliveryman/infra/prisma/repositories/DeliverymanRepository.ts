import { prisma } from '@database/prisma'
import { Deliveryman, PrismaClient } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../../../dtos/ICreateDeliverymanDTO'
import { IDeliverymanRepository } from '../../../repositories/IDeliverymanRepository'

export class DeliverymanRepository implements IDeliverymanRepository {
  private readonly repository: PrismaClient['deliveryman']

  constructor() {
    this.repository = prisma.deliveryman
  }

  async create(data: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliveryman = await prisma.deliveryman.create({
      data,
    })

    return deliveryman
  }

  async findUnique(username: string): Promise<Deliveryman | undefined> {
    const deliveryman = await this.repository.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    })

    return deliveryman === null ? undefined : deliveryman
  }
}
