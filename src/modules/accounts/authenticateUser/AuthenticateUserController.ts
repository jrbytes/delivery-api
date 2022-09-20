import { Request, Response } from 'express'
import { AuthenticateClientUseCase } from './AuthenticateUserUseCase'

export class AuthenticateClientController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const authenticateClientUseCase = new AuthenticateClientUseCase()

    const token = await authenticateClientUseCase.execute({
      password,
      username
    })

    return response.json(token)
  }
}
