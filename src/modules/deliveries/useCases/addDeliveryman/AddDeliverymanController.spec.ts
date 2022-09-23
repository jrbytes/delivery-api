import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Add Deliveryman Controller', () => {
  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to add a deliveryman to one delivery', async () => {
    const usernameClient = 'usernameClient'
    const passwordClient = 'passwordClient'

    await request(app).post('/clients').send({
      username: usernameClient,
      password: passwordClient,
    })

    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username: usernameClient,
        password: passwordClient,
      })

    const responseCreateDelivery = await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Akko 3068',
      })
      .set('Authorization', `Bearer ${responseAuthenticateClient.body.token}`)

    const usernameDeliveryman = 'username-deliveryman'
    const passwordDeliveryman = 'password-deliveryman'

    const responseCreateDeliveryman = await request(app)
      .post('/deliverymen')
      .send({
        username: usernameDeliveryman,
        password: passwordDeliveryman,
      })

    const responseAuthenticateDeliveryman = await request(app)
      .post('/deliveryman/authenticate')
      .send({
        username: usernameDeliveryman,
        password: passwordDeliveryman,
      })

    const responseAddDeliveryman = await request(app)
      .patch(`/deliveries/add-deliveryman/${responseCreateDelivery.body.id}`)
      .set({
        deliveryman_id: responseCreateDeliveryman.body.id,
        Authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    expect(responseAddDeliveryman.status).toBe(200)
  })
})
