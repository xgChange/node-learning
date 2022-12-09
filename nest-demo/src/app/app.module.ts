import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogInterceptor } from 'src/log/log.inerceptor';
import { LoggerModule } from 'src/log/log.module';
import { TransformInterceptor } from 'src/transform/transform.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats';
import { UserModule } from './user';

@Module({
  imports: [CatsModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
