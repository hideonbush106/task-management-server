import { ApiProperty } from '@nestjs/swagger'
import { DataResponse } from './openapi.builder'

export class SuccessResponse {
  @ApiProperty({
    type: Boolean,
    required: true,
    example: true,
    description: 'The response status.'
  })
  success: boolean

  constructor(success: boolean) {
    this.success = success
  }
}
export class SuccessDataResponse extends DataResponse(SuccessResponse) {}
