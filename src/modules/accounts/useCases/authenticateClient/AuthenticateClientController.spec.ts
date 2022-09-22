import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

let server: any

describe('Authenticate Client Controller', () => {
  beforeAll(async () => {
    await prisma.clients.create({
      data: {
        username: 'username',
        password: 'password'
      }
    })

    server = app.listen()
  })

  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    await prisma.$transaction([deleteClient])
    await prisma.$disconnect()

    await server.close()
  })

  it('should be able to authenticate a client', async () => {
    const username = 'jrbytes'
    const password = 'password'

    await request(server).post('/clients').send({
      username,
      password
    })

    const responseAuthenticate = await request(server).post('/client/authenticate').send({
      username,
      password
    })

    expect(responseAuthenticate.status).toBe(200)
  })
})
