import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

describe('Show Delivery Controller', () => {
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

  it('should be able to show an delivery', async () => {
    const responseClient = await request(app).post('/clients').send({
      username: 'jrbytes',
      password: 'password'
    })

    const responseDelivery = await request(app).post('/delivery').send({
      item_name: 'Keyboard Gamer',
      client_id: responseClient.body.id
    })

    const responseShowDelivery = await request(app).get(
      `/delivery/${responseDelivery.body.id as string}`
    )

    expect(responseShowDelivery.status).toBe(200)
  })
})
