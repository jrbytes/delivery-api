import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IClientsRepository } from '../../../clients/repositories/IClientsRepository'
import { IAuthenticateDTO } from '../../dtos/IAuthenticateDTO'

export class AuthenticateClientUseCase {
  constructor(private readonly clientsRepository: IClientsRepository) {}

  async execute({ password, username }: IAuthenticateDTO): Promise<string> {
    const messageError = 'Username or password incorrect'

    const client = await this.clientsRepository.findUnique(username)

    if (client == null) {
      throw new Error(messageError)
    }

    const passwordMatch = await compare(password, client.password)

    if (!passwordMatch) {
      throw new Error(messageError)
    }

    const token = sign({ username }, process.env.CLIENT_SECRET as string, {
      subject: client.id,
      expiresIn: '1d',
    })

    return token
  }
}
