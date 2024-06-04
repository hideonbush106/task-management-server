import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator'

export class RegisterReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(30)
  fullName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string
}
