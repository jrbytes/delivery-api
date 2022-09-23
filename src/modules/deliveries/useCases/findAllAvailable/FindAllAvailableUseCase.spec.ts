import { InMemoryDeliveriesRepository } from '../../repositories/memory/InMemoryDeliveriesRepository'
import { FindAllAvailableUseCase } from './FindAllAvailableUseCase'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let listAllAvailableDelivery: FindAllAvailableUseCase

describe('List All Available Delivery', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    listAllAvailableDelivery = new FindAllAvailableUseCase(
      inMemoryDeliveriesRepository
    )
  })

  it('should be able list all available delivery', async () => {
    await inMemoryDeliveriesRepository.create({
      client_id: 'client_id',
      item_name: 'item_name'
    })

    const deliveries = await listAllAvailableDelivery.execute()

    expect(deliveries).toHaveLength(1)
  })
})
