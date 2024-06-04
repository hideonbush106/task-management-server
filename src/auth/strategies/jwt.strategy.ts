import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('jwtSecretKey')
    })
  }

  async validate(payload: TokenPayload) {
    return { _id: payload.sub, email: payload.email }
  }
}

export type TokenPayload = {
  fullName: string
  sub: string
  email: string
  iat?: number
  exp?: number
}
