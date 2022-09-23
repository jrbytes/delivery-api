import { InMemoryDeliveriesRepository } from '../../repositories/memory/InMemoryDeliveriesRepository'
import { CreateDeliveryUseCase } from './CreateDeliveryUseCase'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let createDelivery: CreateDeliveryUseCase

describe('Create Delivery', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    createDelivery = new CreateDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able sum', async () => {
    const delivery = await createDelivery.execute({
      client_id: 'client_id',
      item_name: 'item_name',
    })

    expect(delivery).toHaveProperty('id')
  })
})
