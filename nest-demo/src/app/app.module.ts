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
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfig } from 'src/config/dbconfig';

const isProd = process.env.NODE_ENV === 'production';

const configModule = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: [isProd ? '.prod.env' : '.env'],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database, entities } =
        configService.get('db');
      return {
        type: 'mysql',
        host,
        port: port,
        username,
        password,
        database,
        entities: [entities],
        synchronize: true,
      };
    },
  }),
];
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
    // console.log('sss', this.configService.get('TYPEORM_HOST'));
  }
}
