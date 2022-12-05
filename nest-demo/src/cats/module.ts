import { Module } from '@nestjs/common';
import { CatsController } from './controller';
import { CatsService } from './service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
