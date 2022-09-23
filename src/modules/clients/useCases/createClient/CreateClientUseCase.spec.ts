import { InMemoryClientsRepository } from '../../repositories/memory/InMemoryClientsRepository'
import { CreateClientUseCase } from './CreateClientUseCase'

let inMemoryClientsRepository: InMemoryClientsRepository
let createClient: CreateClientUseCase

describe('Create Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    createClient = new CreateClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to create a new client', async () => {
    const client = await createClient.execute({
      username: 'username',
      password: 'password',
    })

    expect(client).toHaveProperty('id')
  })

  it('should not be able to create a new client with username exists', async () => {
    await createClient.execute({
      username: 'username',
      password: 'password',
    })

    await expect(
      createClient.execute({
        username: 'username',
        password: 'password',
      })
    ).rejects.toEqual(new Error('Client already exists'))
  })
})
