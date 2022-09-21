import { hash } from 'bcrypt'

import { Deliveryman } from '@prisma/client'

import { prisma } from '../../../../database/prisma/prismaClient'

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute ({ username, password }: ICreateDeliveryman): Promise<Deliveryman> {
    const deliverymanExists = await prisma.deliveryman.findUnique({
      where: {
        username
      }
    })

    if (deliverymanExists != null) {
      throw new Error('Deliveryman already exists')
    }

    const hashPassword = await hash(password, 10)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return deliveryman
  }
}
