import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * Enable CORS With no Config
  // !! TODO: Config CORS following security recomendations
  app.enableCors();

  // * Set Validation Pipes to use DTO's as validators
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
  }));

  app.setGlobalPrefix("/api/v1")

  await app.listen(3000);
}
bootstrap();
