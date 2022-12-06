import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ReportLogger } from './log/ReportLogger';
import { LoggerMiddleware } from './middleware/logger';

async function bootstrap() {
  const reportLogger = new ReportLogger();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true, // Access-Control-Allow-Credentials 允许服务端发送cookie数据
    },
    bufferLogs: true,
    // logger: reportLogger,
  });
  app.use(new LoggerMiddleware().use);
  app.useLogger(reportLogger);
  await app.listen(3000);
}
bootstrap();
