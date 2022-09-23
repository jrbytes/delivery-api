import { Request, Response } from 'express'

import { ClientsRepository } from '@modules/clients/infra/prisma/repositories/ClientsRepository'

import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase'

export class FindAllDeliveriesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { client_id } = request

    const repository = new ClientsRepository()
    const findAllDeliveries = new FindAllDeliveriesUseCase(repository)

    const clientWithDeliveries = await findAllDeliveries.execute(client_id)

    return response.json(clientWithDeliveries)
  }
}
