import { InMemoryDeliveriesRepository } from '../../repositories/memory/InMemoryDeliveriesRepository'
import { AddDeliverymanUseCase } from '../addDeliveryman/AddDeliverymanUseCase'
import { AddEndDateUseCase } from './AddEndDateUseCase'

let inMemoryDeliveriesRepository: InMemoryDeliveriesRepository
let addDeliveryman: AddDeliverymanUseCase
let addEndDate: AddEndDateUseCase

describe('Add End Date', () => {
  beforeEach(() => {
    inMemoryDeliveriesRepository = new InMemoryDeliveriesRepository()
    addDeliveryman = new AddDeliverymanUseCase(inMemoryDeliveriesRepository)
    addEndDate = new AddEndDateUseCase(inMemoryDeliveriesRepository)
  })

  it('should be able add end date to one delivery', async () => {
    const delivery = await inMemoryDeliveriesRepository.create({
      client_id: 'client_id',
      item_name: 'item_name',
    })

    await addDeliveryman.execute({
      delivery_id: delivery.id,
      deliveryman_id: 'deliveryman_id',
    })

    const deliveryWithEndDate = await addEndDate.execute({
      delivery_id: delivery.id,
      deliveryman_id: 'deliveryman_id',
    })

    expect(deliveryWithEndDate.end_at).not.toBeNull()
  })

  it('should not be able add end date if delivery not have one deliveryman', async () => {
    await expect(
      addEndDate.execute({
        delivery_id: 'delivery_id',
        deliveryman_id: 'deliveryman_id',
      })
    ).rejects.toEqual(
      new Error('Delivery not found, should to add a deliveryman before')
    )
  })
})
