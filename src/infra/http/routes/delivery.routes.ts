import { Router } from 'express'

import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { ShowDeliveryController } from '@modules/deliveries/useCases/showDelivery/ShowDeliveryController'

const deliveryRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const showDeliveryController = new ShowDeliveryController()

deliveryRoutes.post('/', createDeliveryController.handle)
deliveryRoutes.get('/:id', showDeliveryController.handle)

export { deliveryRoutes }
