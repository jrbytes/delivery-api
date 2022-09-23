import { Deliveries } from '@prisma/client'

import { ICreateDeliveryDTO } from '../dtos/ICreateDeliveryDTO'

export interface IDeliveriesRepository {
  create: (data: ICreateDeliveryDTO) => Promise<Deliveries>
  findById: (id: string) => Promise<Deliveries | undefined>
  findAllAvailable: () => Promise<Deliveries[]>
  addDeliveryman: (delivery_id: string, deliveryman_id: string) => Promise<Deliveries | undefined>
}
