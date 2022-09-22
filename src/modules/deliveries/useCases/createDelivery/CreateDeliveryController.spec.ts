import request from 'supertest'

import { prisma } from '@database/prisma'
import { app } from '@infra/http'

describe('Create Delivery Controller', () => {
  beforeAll(async () => {
    await prisma.clients.create({
      data: {
        username: 'username',
        password: 'password'
      }
    })
  })

  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteClient])
    await prisma.$disconnect()
  })

  it('should be able to create an delivery', async () => {
    const responseClient = await request(app).post('/clients').send({
      username: 'jrbytes',
      password: 'password'
    })

    const responseDelivery = await request(app).post('/deliveries').send({
      item_name: 'Keyboard Gamer',
      client_id: responseClient.body.id
    })

    expect(responseDelivery.status).toBe(200)
  })
})
