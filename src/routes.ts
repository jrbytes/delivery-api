import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateUser/AuthenticateUserController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()

routes.post('/authenticate', authenticateClientController.handle)
routes.post('/clients', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)

export { routes }