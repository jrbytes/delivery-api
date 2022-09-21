import { Request, Response } from 'express'

import { ClientsRepository } from '../../../clients/infra/prisma/repositories/ClientsRepository'
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase'

export class AuthenticateClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const repository = new ClientsRepository()
    const authenticateClientUseCase = new AuthenticateClientUseCase(
      repository
    )

    const token = await authenticateClientUseCase.execute({
      password,
      username
    })

    return response.json(token)
  }
}
