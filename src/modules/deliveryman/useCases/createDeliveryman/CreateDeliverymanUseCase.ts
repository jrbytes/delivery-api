import { hash } from 'bcrypt'

import { Deliveryman } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../../dtos/ICreateDeliverymanDTO'
import { IDeliverymanRepository } from '../../repositories/IDeliverymanRepository'

export class CreateDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: IDeliverymanRepository) {}

  async execute({
    username,
    password,
  }: ICreateDeliverymanDTO): Promise<Deliveryman> {
    const deliverymanExists = await this.deliverymanRepository.findUnique(
      username
    )

    if (deliverymanExists != null) {
      throw new Error('Deliveryman already exists')
    }

    const hashPassword = await hash(password, 10)

    const deliveryman = await this.deliverymanRepository.create({
      username: username.toLowerCase(),
      password: hashPassword,
    })

    return deliveryman
  }
}
