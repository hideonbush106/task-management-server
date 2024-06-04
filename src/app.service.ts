import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Visit /api-docs to read API Documentation ✨'
    }
  }
}
