import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from 'src/middleware/logger';
import { CatsController } from './controller';
import { OtherService } from './otherService';
import { UserService } from './service';

@Module({
  controllers: [CatsController],
  providers: [UserService, OtherService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/user/name', method: RequestMethod.GET });
  }
}
