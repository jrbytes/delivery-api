import { InMemoryDeliveriesRepository } from '../../repositories/memory/InMemoryDeliveriesRepository'
import { AddDeliverymanUseCase } from './AddDeliverymanUseCase'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let addDeliveryman: AddDeliverymanUseCase

describe('Add Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    addDeliveryman = new AddDeliverymanUseCase(
      inMemoryDeliveriesRepository
    )
  })

  it('should be able add deliveryman to one delivery', async () => {
    const delivery = await inMemoryDeliveriesRepository.create({
      client_id: 'client_id',
      item_name: 'item_name'
    })

    await addDeliveryman.execute({
      delivery_id: delivery.id,
      deliveryman_id: 'deliveryman_id'
    })

    expect(inMemoryDeliveriesRepository.deliveries[0].deliveryman_id).toBe('deliveryman_id')
  })

  it('should not be able add deliveryman to one delivery if delivery not exists', async () => {
    await expect(
      addDeliveryman.execute({
        delivery_id: 'delivery_id',
        deliveryman_id: 'deliveryman_id'
      })
    ).rejects.toEqual(new Error('Delivery not found'))
  })
})
