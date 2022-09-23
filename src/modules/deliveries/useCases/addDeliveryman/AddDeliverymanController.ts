import { Request, Response } from 'express'

import { DeliveriesRepository } from '@modules/deliveries/infra/prisma/repositories/DeliveriesRepository'

import { AddDeliverymanUseCase } from './AddDeliverymanUseCase'

export class AddDeliverymanController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params
    const { deliveryman_id } = request

    const repository = new DeliveriesRepository()
    const addDeliverymanUseCase = new AddDeliverymanUseCase(repository)
    const delivery = await addDeliverymanUseCase.execute({
      delivery_id,
      deliveryman_id
    })

    return response.json(delivery)
  }
}
