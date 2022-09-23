import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Find All Available Controller', () => {
  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to list all available delivery', async () => {
    const usernameClient = 'username-client'
    const passwordClient = 'password-client'
    const usernameDeliveryman = 'username-deliveryman'
    const passwordDeliveryman = 'password-deliveryman'

    const responseClient = await request(app).post('/clients').send({
      username: usernameClient,
      password: passwordClient,
    })

    await request(app).post('/deliverymen').send({
      username: usernameDeliveryman,
      password: passwordDeliveryman,
    })

    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username: usernameClient,
        password: passwordClient,
      })

    const responseAuthenticateDeliveryman = await request(app)
      .post('/deliveryman/authenticate')
      .send({
        username: usernameDeliveryman,
        password: passwordDeliveryman,
      })

    await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Keyboard Gamer',
      })
      .set({
        authorization: `Bearer ${responseAuthenticateClient.body.token}`,
        request: responseClient.body.id,
      })

    const responseFindAllAvailable = await request(app)
      .get('/deliveries/available')
      .set({
        authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    expect(responseFindAllAvailable.status).toBe(200)
    expect(responseFindAllAvailable.body).toHaveLength(1)
  })
})
