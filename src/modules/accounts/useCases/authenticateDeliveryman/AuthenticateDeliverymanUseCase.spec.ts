import { app } from '@infra/http'

import { InMemoryDeliverymanRepository } from '../../../deliveryman/repositories/memory/InMemoryDeliverymanRepository'
import { CreateDeliverymanUseCase } from '../../../deliveryman/useCases/createDeliveryman/CreateDeliverymanUseCase'
import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let authenticateDeliveryman: AuthenticateDeliverymanUseCase
let createDeliveryman: CreateDeliverymanUseCase

let server: any

describe('Authenticate Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    createDeliveryman = new CreateDeliverymanUseCase(
      inMemoryDeliverymanRepository
    )
    authenticateDeliveryman = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymanRepository
    )
  })

  beforeAll(() => {
    server = app.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('should be able to deliveryman authenticate', async () => {
    const password = '123456'

    const deliveryman = await createDeliveryman.execute({
      username: 'johndoe',
      password,
    })

    const authenticate = await authenticateDeliveryman.execute({
      username: deliveryman.username,
      password,
    })

    expect(authenticate.length > 100).toBe(true)
  })

  it('should not be able if deliveryman has null', async () => {
    await expect(
      authenticateDeliveryman.execute({
        username: 'johndoe',
        password: '123456',
      })
    ).rejects.toHaveProperty('message', 'Username or password incorrect')
  })

  it('should not be able if password not match', async () => {
    const password = '123456'

    await createDeliveryman.execute({
      username: 'johndoe',
      password,
    })

    await expect(
      authenticateDeliveryman.execute({
        username: 'johndoe',
        password: '654321',
      })
    ).rejects.toHaveProperty('message', 'Username or password incorrect')
  })
})
