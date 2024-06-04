import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModule } from '~/task/task.module'
import { UserModule } from '~/user/user.module'
import { UserService } from '~/user/user.service'
import { TaskService } from '~/task/services/task.service'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ uri: configService.get<string>('mongodbConnectionString') })
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      isGlobal: true,
      load: [config]
    }),
    TaskModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, TaskService, UserService]
})
export class AppModule {}
