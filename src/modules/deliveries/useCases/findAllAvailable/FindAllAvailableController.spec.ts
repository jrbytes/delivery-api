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
    const username = 'username'
    const password = 'password'

    const responseClient = await request(app).post('/clients').send({
      username,
      password
    })

    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username,
        password
      })

    await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Keyboard Gamer'
      })
      .set({
        authorization: `Bearer ${responseAuthenticateClient.body.token}`,
        request: responseClient.body.id
      })

    const responseFindAllAvailable = await request(app)
      .get('/deliveries/available')
      .set({
        authorization: `Bearer ${responseAuthenticateClient.body.token}`
      })

    expect(responseFindAllAvailable.status).toBe(200)
    expect(responseFindAllAvailable.body).toHaveLength(1)
  })
})
