import { Request, Response } from 'express'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createDeliveryUseCase = new CreateDeliverymanUseCase()

    const delivery = await createDeliveryUseCase.execute({
      username,
      password
    })

    return response.status(201).json(delivery)
  }
}