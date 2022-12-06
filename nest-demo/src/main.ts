import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { ReportLogger } from './log/ReportLogger';
import { LoggerMiddleware } from './middleware/logger';
import { join } from 'path';

const staticAssetsFloder = join(__dirname, '..', 'upload_static');

async function bootstrap() {
  const reportLogger = new ReportLogger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: '*',
      credentials: true, // Access-Control-Allow-Credentials 允许服务端发送cookie数据
    },
    bufferLogs: true,
    logger: reportLogger,
  });
  app.use(new LoggerMiddleware().use);
  app.useLogger(reportLogger);

  // 静态资源
  app.useStaticAssets(staticAssetsFloder, {
    prefix: '/public',
  });

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
