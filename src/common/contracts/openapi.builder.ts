import { mixin } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { ClassConstructor } from 'class-transformer'

export function DataResponse<TDoc extends ClassConstructor<any>>(Doc: TDoc, options?: ApiPropertyOptions | undefined) {
  class DataResponse {
    @ApiProperty({
      required: true,
      type: Doc,
      ...options
    })
    data: typeof Doc
  }
  return mixin(DataResponse)
}
