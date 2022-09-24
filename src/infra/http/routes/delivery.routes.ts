import { Router } from 'express'

import { ensureAuthenticateClient } from '@infra/middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from '@infra/middlewares/ensureAuthenticateDeliveryman'
import { AddDeliverymanController } from '@modules/deliveries/useCases/addDeliveryman/AddDeliverymanController'
import { AddEndDateController } from '@modules/deliveries/useCases/addEndDate/AddEndDateController'
import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from '@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { ShowDeliveryController } from '@modules/deliveries/useCases/showDelivery/ShowDeliveryController'

const deliveryRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const showDeliveryController = new ShowDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const addDeliverymanController = new AddDeliverymanController()
const addEndDateController = new AddEndDateController()

deliveryRoutes.post(
  '/',
  ensureAuthenticateClient,
  createDeliveryController.handle
)
deliveryRoutes.patch(
  '/add-deliveryman/:delivery_id',
  ensureAuthenticateDeliveryman,
  addDeliverymanController.handle
)
deliveryRoutes.patch(
  '/add-end-date/:delivery_id',
  ensureAuthenticateDeliveryman,
  addEndDateController.handle
)
deliveryRoutes.get(
  '/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
)
deliveryRoutes.get(
  '/:id',
  ensureAuthenticateClient,
  showDeliveryController.handle
)

export { deliveryRoutes }
