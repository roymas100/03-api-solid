import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gym-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  constructor() {}
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data })

    return gym
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      take: 20,
      skip: (page - 1) * 20,
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          { description: { contains: query } },
        ],
      },
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const { latitude, longitude } = params

    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * FROM gyms WHERE  ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
