import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

let server: any

describe('Authenticate Deliveryman Controller', () => {
  beforeAll(async () => {
    await prisma.deliveryman.create({
      data: {
        username: 'username',
        password: 'password'
      }
    })

    server = app.listen()
  })

  afterAll(async () => {
    const deleteDeliveryman = prisma.deliveryman.deleteMany()
    await prisma.$transaction([deleteDeliveryman])
    await prisma.$disconnect()

    await server.close()
  })

  it('should be able to authenticate a deliveryman', async () => {
    const username = 'jrbytes'
    const password = 'password'

    await request(server).post('/deliveryman').send({
      username,
      password
    })

    const responseAuthenticate = await request(server).post('/deliveryman/authenticate').send({
      username,
      password
    })

    expect(responseAuthenticate.status).toBe(200)
  })
})
