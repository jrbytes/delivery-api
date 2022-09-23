import { Request, Response } from 'express'

import { DeliverymanRepository } from '../../infra/prisma/repositories/DeliverymanRepository'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const repository = new DeliverymanRepository()
    const createDeliveryUseCase = new CreateDeliverymanUseCase(repository)

    const delivery = await createDeliveryUseCase.execute({
      username,
      password,
    })

    return response.status(201).json(delivery)
  }
}
