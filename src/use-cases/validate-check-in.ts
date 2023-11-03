import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.craeted_at,
      'minutes',
    )

    const MAX_TIME_TO_CHECK_IN_AFTER_CREATION_IN_MINUTES = 20

    if (
      distanceInMinutesFromCheckInCreation >
      MAX_TIME_TO_CHECK_IN_AFTER_CREATION_IN_MINUTES
    ) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    const updatedCheckIn = await this.checkInsRepository.save(checkIn)

    return {
      checkIn: updatedCheckIn,
    }
  }
}
