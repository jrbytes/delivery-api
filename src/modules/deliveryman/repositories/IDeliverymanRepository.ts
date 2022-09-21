import { Deliveryman } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../dtos/ICreateDeliverymanDTO'

export interface IDeliverymanRepository {
  create: (data: ICreateDeliverymanDTO) => Promise<Deliveryman>
  findUnique: (username: string) => Promise<Deliveryman | undefined>
}
