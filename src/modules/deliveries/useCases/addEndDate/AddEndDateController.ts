import { Request, Response } from 'express'

import { DeliveriesRepository } from '@modules/deliveries/infra/prisma/repositories/DeliveriesRepository'

import { AddEndDateUseCase } from './AddEndDateUseCase'

export class AddEndDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { delivery_id } = request.params
    const { deliveryman_id } = request

    const repository = new DeliveriesRepository()
    const addEndDateUseCase = new AddEndDateUseCase(repository)

    const delivery = await addEndDateUseCase.execute({
      delivery_id,
      deliveryman_id,
    })

    return response.json(delivery)
  }
}
