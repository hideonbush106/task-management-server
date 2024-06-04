import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginReqDto } from '~/auth/dto/login.dto'
import { AuthService } from '~/auth/services/auth.service'
import { DataResponse } from '~/common/contracts/openapi.builder'
import { TokenResDto } from '../dto/token.dto'
import { RegisterReqDto } from '../dto/register.dto'
import { SuccessDataResponse } from '~/common/contracts/dto'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginReqDto })
  @ApiOkResponse({ type: DataResponse(TokenResDto) })
  login(@Body() loginReqDto: LoginReqDto) {
    return this.authService.login(loginReqDto)
  }

  @Post('register')
  @ApiBody({ type: RegisterReqDto })
  @ApiOkResponse({ type: SuccessDataResponse })
  register(@Body() registerReqDto: RegisterReqDto) {
    return this.authService.register(registerReqDto)
  }
}
