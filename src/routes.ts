import { Router } from 'express'

import { AuthenticateClientController } from './modules/accounts/useCases/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { ShowDeliveryController } from './modules/deliveries/useCases/showDelivery/ShowDeliveryController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const showDeliveryController = new ShowDeliveryController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/clients', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/delivery', createDeliveryController.handle)
routes.get('/delivery/:id', showDeliveryController.handle)

export { routes }
