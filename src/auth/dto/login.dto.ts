import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'
export class LoginReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}
