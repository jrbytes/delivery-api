import { Request, Response } from 'express'

import { DeliveriesRepository } from '../../infra/prisma/repositories/DeliveriesRepository'
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { item_name } = request.body
    const client_id = request.client_id

    const repository = new DeliveriesRepository()
    const createDeliveryUseCase = new CreateDeliveryUseCase(repository)

    const delivery = await createDeliveryUseCase.execute({
      client_id,
      item_name,
    })

    return response.json(delivery)
  }
}
