import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Create Delivery Controller', () => {
  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to create a delivery', async () => {
    const username = 'username'
    const password = 'password'

    const responseClient = await request(app).post('/clients').send({
      username,
      password,
    })

    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username,
        password,
      })

    const responseDelivery = await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Keyboard Gamer',
      })
      .set({
        authorization: `Bearer ${responseAuthenticateClient.body.token}`,
        request: responseClient.body.id,
      })

    expect(responseDelivery.status).toBe(200)
  })
})
