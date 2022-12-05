import { Module } from '@nestjs/common';
import { CatsController } from './controller';
import { OtherService } from './otherService';
import { UserService } from './service';

@Module({
  controllers: [CatsController],
  providers: [UserService, OtherService],
})
export class UserModule {}
