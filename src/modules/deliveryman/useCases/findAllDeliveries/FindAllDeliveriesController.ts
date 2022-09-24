import { Request, Response } from 'express'

import { DeliverymanRepository } from '@modules/deliveryman/infra/prisma/repositories/DeliverymanRepository'

import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase'

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id } = request

    const repository = new DeliverymanRepository()
    const findAllDeliveries = new FindAllDeliveriesUseCase(repository)

    const deliveries = await findAllDeliveries.execute(deliveryman_id)

    return response.json(deliveries)
  }
}
