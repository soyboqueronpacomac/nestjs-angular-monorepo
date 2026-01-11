import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  logger.log('API Global Prefix set to /api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  logger.log('API Versioning enabled (default: v1)');
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  logger.log('CORS enabled');
  await app.listen(process.env.PORT ?? 3000);
  logger.log(
    `API is running on: http://localhost:${process.env.PORT ?? 3000}/api/v1`,
  );
}
void bootstrap();
