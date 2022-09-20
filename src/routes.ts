import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateUser/AuthenticateUserController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

routes.post('/authenticate', authenticateClientController.handle)
routes.post('/clients', createClientController.handle)

export { routes }