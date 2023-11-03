import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GetUserMetricasUseCase } from './get-user-metrics'

let checkInsRepository: CheckInsRepository
let sut: GetUserMetricasUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricasUseCase(checkInsRepository)
  })

  it('should be able to check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gymId: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gymId: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
