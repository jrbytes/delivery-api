import request from 'supertest'

import { app } from '../../../../app'
import { prisma } from '../../../../database/prisma/prismaClient'

describe('Create Deliveryman Controller', () => {
  beforeAll(async () => {
    await prisma.deliveryman.create({
      data: {
        username: 'username',
        password: 'password'
      }
    })
    console.log('✨ 1 deliveryman created')
  })

  afterAll(async () => {
    const deleteDeliveryman = prisma.deliveryman.deleteMany()
    await prisma.$transaction([deleteDeliveryman])
    await prisma.$disconnect()
  })

  it('should be able to create an deliveryman', async () => {
    const responseDeliveryman = await request(app).post('/deliveryman').send({
      username: 'jrbytes',
      password: 'password'
    })

    expect(responseDeliveryman.status).toBe(201)
  })

  it('should not be able to create an deliveryman if has exists', async () => {
    const responseDeliveryman = await request(app).post('/deliveryman').send({
      username: 'username',
      password: 'password'
    })

    expect(responseDeliveryman.status).toBe(400)
    expect(responseDeliveryman.body).toHaveProperty('message')
    expect(responseDeliveryman.body.message).toBe('Deliveryman already exists')
  })
})
