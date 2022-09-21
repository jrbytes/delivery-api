import { Clients } from '@prisma/client'

import { ICreateClientDTO } from '../dtos/ICreateClienteDTO'

export interface IClientsRepository {
  create: (data: ICreateClientDTO) => Promise<Clients>
  findUnique: (username: string) => Promise<Clients | undefined>
}
