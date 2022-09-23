import { InMemoryDeliveriesRepository } from '../../repositories/memory/InMemoryDeliveriesRepository'
import { CreateDeliveryUseCase } from '../createDelivery/CreateDeliveryUseCase'
import { ShowDeliveryUseCase } from './ShowDeliveryUseCase'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let createDelivery: CreateDeliveryUseCase
let showDelivery: ShowDeliveryUseCase

describe('Show Delivery', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    createDelivery = new CreateDeliveryUseCase(inMemoryDeliveriesRepository)
    showDelivery = new ShowDeliveryUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able show a delivery', async () => {
    const delivery = await createDelivery.execute({
      client_id: 'client_id',
      item_name: 'item_name',
    })

    const show = await showDelivery.execute({
      id: delivery.id,
    })

    expect(show).toHaveProperty('id')
  })
})
