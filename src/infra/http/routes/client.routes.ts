import { Router } from 'express'

import { ensureAuthenticateClient } from '@infra/middlewares/ensureAuthenticateClient'
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController'
import { FindAllDeliveriesController } from '@modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController'

const clientRoutes = Router()

const createClientController = new CreateClientController()
const findAllDeliveriesController = new FindAllDeliveriesController()

clientRoutes.post('/', createClientController.handle)
clientRoutes.get(
  '/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
)

export { clientRoutes }
