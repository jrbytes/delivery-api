import { Request, Response } from 'express'

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'

export class CreateDeliveryController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { item_name, client_id } = request.body

    const createDeliveryUseCase = new CreateDeliveryUseCase()

    const delivery = await createDeliveryUseCase.execute({
      client_id,
      item_name
    })

    return response.json(delivery)
  }
}
