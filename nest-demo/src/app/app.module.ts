import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogInterceptor } from 'src/log/log.inerceptor';
import { LoggerModule } from 'src/log/log.module';
import { TransformInterceptor } from 'src/transform/transform.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';

const configModule = [ConfigModule.forRoot()];

const businessModules = [CatsModule, UserModule, LoggerModule, AuthModule];

@Module({
  imports: [...configModule, ...businessModules],
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
export class AppModule {
  constructor(private configService: ConfigService) {
    // console.log('sss', this.configService.get('db_pwd'));
  }
}
