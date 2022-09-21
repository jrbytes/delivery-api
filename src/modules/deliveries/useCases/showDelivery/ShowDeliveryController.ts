import { Request, Response } from 'express'

import { DeliveriesRepository } from '../../infra/prisma/repositories/DeliveriesRepository'
import { ShowDeliveryUseCase } from './ShowDeliveryUseCase'

export class ShowDeliveryController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const repository = new DeliveriesRepository()
    const showDeliveryUseCase = new ShowDeliveryUseCase(
      repository
    )

    const delivery = await showDeliveryUseCase.execute({
      id
    })

    return response.json(delivery)
  }
}
