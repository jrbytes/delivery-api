import { Request, Response } from 'express'

import { DeliveriesRepository } from '@modules/deliveries/infra/prisma/repositories/DeliveriesRepository'

import { FindAllAvailableUseCase } from './FindAllAvailableUseCase'

export class FindAllAvailableController {
  async handle(request: Request, response: Response): Promise<Response> {
    const repository = new DeliveriesRepository()
    const deliveries = new FindAllAvailableUseCase(repository)

    const deliveriesAvailable = await deliveries.execute()

    return response.json(deliveriesAvailable)
  }
}
