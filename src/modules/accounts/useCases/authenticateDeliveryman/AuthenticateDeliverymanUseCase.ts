import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IDeliverymanRepository } from '../../../deliveryman/repositories/IDeliverymanRepository'

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  constructor(private readonly deliverymanRepository: IDeliverymanRepository) {}

  async execute({
    password,
    username,
  }: IAuthenticateDeliveryman): Promise<string> {
    const messageError = 'Username or password incorrect'

    const deliveryman = await this.deliverymanRepository.findUnique(username)

    if (deliveryman == null) {
      throw new Error(messageError)
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error(messageError)
    }

    const token = sign({ username }, process.env.DELIVERYMAN_SECRET as string, {
      subject: deliveryman.id,
      expiresIn: '1d',
    })

    return token
  }
}
