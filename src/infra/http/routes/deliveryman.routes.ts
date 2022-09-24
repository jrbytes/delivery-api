import { Router } from 'express'

import { ensureAuthenticateDeliveryman } from '@infra/middlewares/ensureAuthenticateDeliveryman'
import { CreateDeliverymanController } from '@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { FindAllDeliveriesController } from '@modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController'

const deliverymanRoutes = Router()

const createDeliverymanController = new CreateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()

deliverymanRoutes.post('/', createDeliverymanController.handle)
deliverymanRoutes.get(
  '/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesController.handle
)

export { deliverymanRoutes }
