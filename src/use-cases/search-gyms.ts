import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gym-repository'

interface SearchGymsUseCaseParams {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
