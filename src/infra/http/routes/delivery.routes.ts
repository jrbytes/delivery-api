import { Router } from 'express'

import { ensureAuthenticateClient } from '@infra/middlewares/ensureAuthenticateClient'
import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { ShowDeliveryController } from '@modules/deliveries/useCases/showDelivery/ShowDeliveryController'

const deliveryRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const showDeliveryController = new ShowDeliveryController()

deliveryRoutes.post('/', ensureAuthenticateClient, createDeliveryController.handle)
deliveryRoutes.get('/:id', ensureAuthenticateClient, showDeliveryController.handle)

export { deliveryRoutes }
