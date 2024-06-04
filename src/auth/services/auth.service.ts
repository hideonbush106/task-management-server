import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { LoginReqDto } from '~/auth/dto/login.dto'
import { RegisterReqDto } from '~/auth/dto/register.dto'
import { TokenResDto } from '../dto/token.dto'
import { SuccessResponse } from '~/common/contracts/dto'
import * as bcrypt from 'bcrypt'
import { TokenPayload } from '~/auth/strategies/jwt.strategy'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from '~/user/repositories/user.repository'
import { Errors } from '~/common/contracts/error'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {}

  public async register(registerReqDto: RegisterReqDto): Promise<SuccessResponse> {
    const user = await this.userRepository.findOne({
      conditions: {
        email: registerReqDto.email
      }
    })
    if (user) {
      throw new ConflictException(Errors.userAlreadyExist)
    } else {
      await this.userRepository.create({
        ...registerReqDto,
        password: await this.hashPassword(registerReqDto.password)
      })
      return new SuccessResponse(true)
    }
  }

  public async login(loginReqDto: LoginReqDto): Promise<TokenResDto> {
    const user = await this.userRepository.findOne({
      conditions: {
        email: loginReqDto.email
      }
    })
    if (!user) {
      throw new BadRequestException(Errors.wrongEmailOrPassword)
    } else {
      const isPasswordMatch = await this.comparePassword(loginReqDto.password, user.password)
      if (!isPasswordMatch) throw new BadRequestException(Errors.wrongEmailOrPassword)
      else
        return this.generateTokens({
          email: user.email,
          fullName: user.fullName,
          sub: user.id
        })
    }
  }

  private async hashPassword(candidatePassword: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(candidatePassword, salt)
    return hashedPassword
  }

  private async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  private generateTokens(accessTokenPayload: TokenPayload) {
    return {
      accessToken: this.jwtService.sign(accessTokenPayload, {
        secret: this.configService.get<string>('jwtSecretKey'),
        expiresIn: Number(this.configService.get<number>('jwtExpirationTime'))
      })
    }
  }
}
