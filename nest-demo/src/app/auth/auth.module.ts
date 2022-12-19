import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stratgey/local-stratgey';
import { LoggerModule } from 'src/log/log.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {
  //
}
