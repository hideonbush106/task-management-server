import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Streamline your workflow with efficient task tracking')
    .setVersion('0.0.1')
    .setLicense('MIT', 'https://mit-license.org/')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000, () => {
    console.log('\x1b[35m', '[✨] App listen on http://localhost:8000')
    console.log('\x1b[35m', '[📃] Swagger is live on http://localhost:8000/api-docs')
  })
}
bootstrap()
