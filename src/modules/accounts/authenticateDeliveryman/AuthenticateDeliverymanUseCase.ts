import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../database/prisma/prismaClient"


interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ password, username }: IAuthenticateDeliveryman) {
    const messageError = 'Username or password incorrect'

    const deliveryman = await prisma.deliveryman.findUnique({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error(messageError)
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if (!passwordMatch) {
      throw new Error(messageError)
    }

    const token = sign({ username }, 'secret-deliveryman', {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}