import { InMemoryDeliverymanRepository } from '../../repositories/memory/InMemoryDeliverymanRepository'
import { FindAllDeliveriesUseCase } from './FindAllDeliveriesUseCase'

let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let findDeliveriesByDeliveryman: FindAllDeliveriesUseCase

describe('Find All Deliveries By Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    findDeliveriesByDeliveryman = new FindAllDeliveriesUseCase(
      inMemoryDeliverymanRepository
    )
  })

  it('should be able to find all deliveries by deliveryman', async () => {
    const deliveryman = await inMemoryDeliverymanRepository.create({
      username: 'deliveryman',
      password: '123456',
    })

    const findDeliveries = await findDeliveriesByDeliveryman.execute(
      deliveryman.id
    )

    expect(findDeliveries).toHaveProperty('id')
  })

  it('should not be able to find all deliveries by deliveryman', async () => {
    await expect(
      findDeliveriesByDeliveryman.execute('non-existing-deliveryman')
    ).rejects.toEqual(new Error('Deliveryman not found'))
  })
})
