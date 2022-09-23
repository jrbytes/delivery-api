import { Router } from 'express'

import { ensureAuthenticateClient } from '@infra/middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from '@infra/middlewares/ensureAuthenticateDeliveryman'
import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from '@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { ShowDeliveryController } from '@modules/deliveries/useCases/showDelivery/ShowDeliveryController'

const deliveryRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const showDeliveryController = new ShowDeliveryController()
const findAllAvailableController = new FindAllAvailableController()

deliveryRoutes.post('/', ensureAuthenticateClient, createDeliveryController.handle)
deliveryRoutes.get('/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)
deliveryRoutes.get('/:id', ensureAuthenticateClient, showDeliveryController.handle)

export { deliveryRoutes }
