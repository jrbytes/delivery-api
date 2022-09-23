import { Router } from 'express'

import { AuthenticateDeliverymanController } from '@modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController'

const authenticateDeliverymanRoutes = Router()

const authenticateDeliverymanController =
  new AuthenticateDeliverymanController()

authenticateDeliverymanRoutes.post(
  '/',
  authenticateDeliverymanController.handle
)

export { authenticateDeliverymanRoutes }
