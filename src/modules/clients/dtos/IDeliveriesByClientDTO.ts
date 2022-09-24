import { Deliveries } from '@prisma/client'

export interface IDeliveriesByClientDTO {
  id: string
  username: string
  deliveries: Deliveries[]
}
