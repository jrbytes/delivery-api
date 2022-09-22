import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

let server: any

describe('Create Delivery Controller', () => {
  beforeAll(async () => {
    await prisma.clients.create({
      data: {
        username: 'username',
        password: 'password'
      }
    })

    server = app.listen()
  })

  afterAll(async () => {
    const deleteClient = prisma.clients.deleteMany()
    const deleteDelivery = prisma.deliveries.deleteMany()
    await prisma.$transaction([deleteDelivery, deleteClient])
    await prisma.$disconnect()

    await server.close()
  })

  it('should be able to create an delivery', async () => {
    const responseClient = await request(server).post('/clients').send({
      username: 'jrbytes',
      password: 'password'
    })

    const responseDelivery = await request(server).post('/delivery').send({
      item_name: 'Keyboard Gamer',
      client_id: responseClient.body.id
    })

    expect(responseDelivery.status).toBe(200)
  })
})
