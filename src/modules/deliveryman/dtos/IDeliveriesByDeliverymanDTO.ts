import { Deliveries } from '@prisma/client'

export interface IDeliveriesByDeliverymanDTO {
  id: string
  username: string
  deliveries: Deliveries[]
}
