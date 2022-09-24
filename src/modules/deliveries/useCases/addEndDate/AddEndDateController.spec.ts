import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

let deliveryman_id: string

describe('Add End Date Controller', () => {
  beforeAll(async () => {
    await request(app).post('/clients').send({
      username: 'username-client',
      password: '123456',
    })

    const requestDeliveryman = await request(app).post('/deliverymen').send({
      username: 'username-deliveryman',
      password: '123456',
    })

    deliveryman_id = requestDeliveryman.body.id
  })

  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDeliveryman = prisma.deliveryman.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteDeliveryman, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to add a end date to one delivery', async () => {
    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username: 'username-client',
        password: '123456',
      })

    const responseCreateDelivery = await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Akko 3068',
      })
      .set('Authorization', `Bearer ${responseAuthenticateClient.body.token}`)

    const responseAuthenticateDeliveryman = await request(app)
      .post('/deliveryman/authenticate')
      .send({
        username: 'username-deliveryman',
        password: '123456',
      })

    await request(app)
      .patch(`/deliveries/add-deliveryman/${responseCreateDelivery.body.id}`)
      .set({
        deliveryman_id,
        Authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    const responseAddEndDate = await request(app)
      .patch(`/deliveries/add-end-date/${responseCreateDelivery.body.id}`)
      .set({
        deliveryman_id,
        Authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    expect(responseAddEndDate.status).toBe(200)
  })

  it('should not be able to add a end date to one delivery', async () => {
    const responseAuthenticateClient = await request(app)
      .post('/client/authenticate')
      .send({
        username: 'username-client',
        password: '123456',
      })

    const responseCreateDelivery = await request(app)
      .post('/deliveries')
      .send({
        item_name: 'Epomaker 3068',
      })
      .set('Authorization', `Bearer ${responseAuthenticateClient.body.token}`)

    const responseAuthenticateDeliveryman = await request(app)
      .post('/deliveryman/authenticate')
      .send({
        username: 'username-deliveryman',
        password: '123456',
      })

    const responseAddEndDate = await request(app)
      .patch(`/deliveries/add-end-date/${responseCreateDelivery.body.id}`)
      .set({
        deliveryman_id,
        Authorization: `Bearer ${responseAuthenticateDeliveryman.body.token}`,
      })

    expect(responseAddEndDate.status).toBe(400)
  })
})
