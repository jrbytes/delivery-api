import { Request, Response } from 'express'

import { ClientsRepository } from '../../infra/prisma/repositories/ClientsRepository'
import { CreateClientUseCase } from './CreateClientUseCase'

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const repository = new ClientsRepository()
    const createClientUseCase = new CreateClientUseCase(repository)

    const client = await createClientUseCase.execute({
      username,
      password,
    })

    return response.status(201).json(client)
  }
}
