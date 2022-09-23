import { InMemoryClientsRepository } from '../../repositories/memory/InMemoryClientsRepository'
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase'

let inMemoryClientsRepository: InMemoryClientsRepository
let findAllDeliveries: FindAllDeliveriesUseCase

describe('Find all deliveries by client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    findAllDeliveries = new FindAllDeliveriesUseCase(
      inMemoryClientsRepository
    )
  })

  it('should be able to create a new client', async () => {
    const client = await inMemoryClientsRepository.create({
      username: 'username',
      password: 'password'
    })

    const list = await findAllDeliveries.execute(client.id)

    expect(list).toHaveProperty('id')
  })

  it('should not be able to create a new client with username exists', async () => {
    await expect(
      findAllDeliveries.execute('client_id_not_exists')
    ).rejects.toEqual(new Error('Client not found'))
  })
})
