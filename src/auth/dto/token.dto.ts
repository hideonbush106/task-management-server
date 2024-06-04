import { ApiProperty } from '@nestjs/swagger'

export class TokenResDto {
  @ApiProperty()
  accessToken: string
}
