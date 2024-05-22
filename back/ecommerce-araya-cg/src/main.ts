import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggingMiddleware } from './middlewares/logging';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS API - Ecommerce FT-48')
    .setDescription(
      'Proyecto integrador de la especialidad Backend del módulo 4',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(loggingMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
