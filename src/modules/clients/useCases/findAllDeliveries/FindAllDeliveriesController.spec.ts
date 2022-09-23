import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Find All Deliveries Controller', () => {
  afterAll(async () => {
    const deleteDeliveries = prisma.deliveries.deleteMany()
    const deleteClient = prisma.clients.deleteMany()
    await prisma.$transaction([deleteDeliveries, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to list deliveries by client', async () => {
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

    await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Goku Shirt - Dragon Ball - M',
      })
      .set({
        client_id: responseClient.body.id,
        Authorization: `Bearer ${responseAuthenticateClient.body.token}`,
      })

    const responseDeliveriesByClient = await request(app)
      .get('/clients/deliveries')
      .set({
        client_id: responseClient.body.id,
        Authorization: `Bearer ${responseAuthenticateClient.body.token}`,
      })

    expect(responseDeliveriesByClient.status).toBe(200)
  })
})
