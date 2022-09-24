import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Find All Deliveries Controller', () => {
  afterAll(async () => {
    const deleteDeliveries = prisma.deliveries.deleteMany()
    const deleteDeliveryman = prisma.deliveryman.deleteMany()
    await prisma.$transaction([deleteDeliveries, deleteDeliveryman])
    await prisma.$disconnect()
  })

  it('should be able to list deliveries by deliveryman', async () => {
    const username = 'username'
    const password = 'password'

    const responseClient = await request(app).post('/clients').send({
      username,
      password,
    })

    const responseDeliveryman = await request(app).post('/deliverymen').send({
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

    const responseAuthenticateDeliveryman = await request(app)
      .post('/deliveryman/authenticate')
      .send({
        username,
        password,
      })

    const responseDeliveriesByDeliveryman = await request(app)
      .get('/deliverymen/deliveries')
      .set({
        deliveryman_id: responseDeliveryman.body.id,
        Authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    expect(responseDeliveriesByDeliveryman.status).toBe(200)
  })
})
