import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Authenticate Client Controller', () => {
  beforeAll(async () => {
    await prisma.clients.create({
      data: {
        username: 'username',
        password: 'password',
      },
    })
  })

  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    await prisma.$transaction([deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to authenticate a client', async () => {
    const username = 'jrbytes'
    const password = 'password'

    await request(app).post('/clients').send({
      username,
      password,
    })

    const responseAuthenticate = await request(app)
      .post('/client/authenticate')
      .send({
        username,
        password,
      })

    expect(responseAuthenticate.status).toBe(200)
  })
})
