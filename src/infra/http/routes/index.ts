import { Router } from 'express'

import { authenticateClientRoutes } from './authenticateClient.routes'
import { authenticateDeliverymanRoutes } from './authenticateDeliveryman.routes'
import { clientRoutes } from './client.routes'
import { deliveryRoutes } from './delivery.routes'
import { deliverymanRoutes } from './deliveryman.routes'

const router = Router()

router.use('/client/authenticate', authenticateClientRoutes)
router.use('/deliveryman/authenticate', authenticateDeliverymanRoutes)
router.use('/clients', clientRoutes)
router.use('/deliverymen', deliverymanRoutes)
router.use('/deliveries', deliveryRoutes)

export { router }
