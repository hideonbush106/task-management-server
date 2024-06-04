import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard {
  static readonly TOKEN = AuthGuard('jwt')
}
