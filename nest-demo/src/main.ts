import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import { ReportLogger } from './log/ReportLogger';
import { LoggerMiddleware } from './middleware/logger';
import { join } from 'path';
import { HttpExceptionFilter } from './error/http-exception.filter';
import { AnyExceptionsFilter } from './error/any-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const staticAssetsFloder = join(__dirname, '..', 'upload_static');

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('My Demo')
    .setDescription('demo description')
    .setVersion('1.0')
    .addTag('demo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

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

  // 全局过滤器，处理异常
  app.useGlobalFilters(new HttpExceptionFilter(), new AnyExceptionsFilter());

  // 全局管道
  app.useGlobalPipes(
    // 里面自带了 class-validator
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // 全局拦截器放到 AppModule里面了

  // swagger
  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
