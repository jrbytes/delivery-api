import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export function ensureAuthenticateDeliveryman (
  request: Request,
  response: Response,
  next: NextFunction
): Response | any {
  const authHeader = request.headers.authorization

  if (authHeader == null) {
    return response.status(401).json({ message: 'Token is missing' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(token, process.env.DELIVERYMAN_SECRET as string)

    request.deliveryman_id = sub as string

    return next()
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token' })
  }
}
