import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggerMiddleware } from './middleware/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  await app.listen(3000);
}
bootstrap();
