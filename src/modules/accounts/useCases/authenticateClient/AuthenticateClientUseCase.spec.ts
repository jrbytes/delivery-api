import { InMemoryClientsRepository } from '../../../clients/repositories/memory/InMemoryClientsRepository'
import { CreateClientUseCase } from '../../../clients/useCases/createClient/CreateClientUseCase'
import { AuthenticateClientUseCase } from './AuthenticateClientUseCase'

let inMemoryClientsRepository: InMemoryClientsRepository
let authenticateClient: AuthenticateClientUseCase
let createClient: CreateClientUseCase

describe('Authenticate Client', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    createClient = new CreateClientUseCase(inMemoryClientsRepository)
    authenticateClient = new AuthenticateClientUseCase(
      inMemoryClientsRepository
    )
  })

  it('should be able to client authenticate', async () => {
    const password = '123456'

    const client = await createClient.execute({
      username: 'johndoe',
      password
    })

    const authenticate = await authenticateClient.execute({
      username: client.username,
      password
    })

    expect(authenticate.length > 100).toBe(true)
  })

  it('should not be able if client has null', async () => {
    await expect(
      authenticateClient.execute({
        username: 'johndoe',
        password: '123456'
      })
    ).rejects.toHaveProperty('message', 'Username or password incorrect')
  })

  it('should not be able if password not match', async () => {
    const password = '123456'

    await createClient.execute({
      username: 'johndoe',
      password
    })

    await expect(
      authenticateClient.execute({
        username: 'johndoe',
        password: '654321'
      })
    ).rejects.toHaveProperty('message', 'Username or password incorrect')
  })
})
