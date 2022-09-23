import { InMemoryDeliverymanRepository } from '../../repositories/memory/InMemoryDeliverymanRepository'
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let createDeliveryman: CreateDeliverymanUseCase

describe('Create Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    createDeliveryman = new CreateDeliverymanUseCase(
      inMemoryDeliverymanRepository
    )
  })

  it('should be able to create a new deliveryman', async () => {
    const client = await createDeliveryman.execute({
      username: 'username',
      password: 'password',
    })

    expect(client).toHaveProperty('id')
  })

  it('should not be able to create a new deliveryman with username exists', async () => {
    await createDeliveryman.execute({
      username: 'username',
      password: 'password',
    })

    await expect(
      createDeliveryman.execute({
        username: 'username',
        password: 'password',
      })
    ).rejects.toEqual(new Error('Deliveryman already exists'))
  })
})
