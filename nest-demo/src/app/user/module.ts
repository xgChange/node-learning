import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/log/log.module';
import { LoggerMiddleware } from 'src/middleware/logger';
import { CalsModule } from '../casl/cals.module';
import { CatsController } from './controller';
import { User } from './entities/user.entity';
import { UserService } from './service';

/**
 * instanceHost.instance = wrapper.forwardRef
    ? Object.assign(instanceHost.instance, new metatype(...instances))
    : new metatype(...instances);

    metatype 就是provides收集的数组，会注入到 controller 中去，也就是初始化controller实例
 */
@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule, CalsModule],
  controllers: [CatsController],
  providers: [UserService], // 然后我们将这两个作为一个 providers，然后在初始化实例的时候会进行注入，准确的找到相应的依赖
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/user/name', method: RequestMethod.GET });
  }
}
