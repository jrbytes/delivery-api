import { Request, Response } from 'express'

import { DeliverymanRepository } from '../../../deliveryman/infra/prisma/repositories/DeliverymanRepository'
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase'

export class AuthenticateDeliverymanController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const repository = new DeliverymanRepository()
    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      repository
    )

    const token = await authenticateDeliverymanUseCase.execute({
      password,
      username
    })

    return response.json({ token })
  }
}
