import { Router } from 'express'

import { AuthenticateClientController } from '@modules/accounts/useCases/authenticateClient/AuthenticateClientController'

const authenticateClientRoutes = Router()

const authenticateClientController = new AuthenticateClientController()

authenticateClientRoutes.post('/', authenticateClientController.handle)

export { authenticateClientRoutes }
