import { Deliveryman } from '@prisma/client'

import { ICreateDeliverymanDTO } from '../dtos/ICreateDeliverymanDTO'
import { IDeliveriesByDeliverymanDTO } from '../dtos/IDeliveriesByDeliverymanDTO'

export interface IDeliverymanRepository {
  create: (data: ICreateDeliverymanDTO) => Promise<Deliveryman>
  findUnique: (username: string) => Promise<Deliveryman | undefined>
  findAllDeliveriesByDeliverymanId: (
    deliveryman_id: string
  ) => Promise<IDeliveriesByDeliverymanDTO | undefined>
}
