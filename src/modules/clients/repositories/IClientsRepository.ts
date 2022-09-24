import { Clients } from '@prisma/client'

import { ICreateClientDTO } from '../dtos/ICreateClienteDTO'
import { IDeliveriesByClientDTO } from '../dtos/IDeliveriesByClientDTO'

export interface IClientsRepository {
  create: (data: ICreateClientDTO) => Promise<Clients>
  findUnique: (username: string) => Promise<Clients | undefined>
  findAllDeliveriesByClientId: (
    client_id: string
  ) => Promise<IDeliveriesByClientDTO | undefined>
}
