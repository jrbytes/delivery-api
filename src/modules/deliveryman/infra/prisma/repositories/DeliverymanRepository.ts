import { Deliveryman, PrismaClient } from '@prisma/client'

import { prisma } from '../../../../../database/prisma/prismaClient'
import { ICreateDeliverymanDTO } from '../../../dtos/ICreateDeliverymanDTO'
import { IDeliverymanRepository } from '../../../repositories/IDeliverymanRepository'

export class DeliverymanRepository implements IDeliverymanRepository {
  private readonly repository: PrismaClient['deliveryman']

  constructor () {
    this.repository = prisma.deliveryman
  }

  async create (data: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliveryman = await prisma.deliveryman.create({
      data
    })

    return deliveryman
  }

  async findUnique (username: string): Promise<Deliveryman | undefined> {
    const deliveryman = await this.repository.findUnique({
      where: {
        username
      }
    })

    return deliveryman === null ? undefined : deliveryman
  }
}
