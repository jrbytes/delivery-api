import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

let server: any

describe('Create Client Controller', () => {
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
    await prisma.$transaction([deleteClient])
    await prisma.$disconnect()

    await server.close()
  })

  it('should be able to create an client', async () => {
    const responseClient = await request(server).post('/clients').send({
      username: 'jrbytes',
      password: 'password'
    })

    expect(responseClient.status).toBe(201)
  })

  it('should not be able to create an client if has exists', async () => {
    const responseClient = await request(server).post('/clients').send({
      username: 'username',
      password: 'password'
    })

    expect(responseClient.status).toBe(400)
    expect(responseClient.body).toHaveProperty('message')
    expect(responseClient.body.message).toBe('Client already exists')
  })
})
