import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/log/log.module';
import { CatsController } from './controller';
import { CatsService } from './service';

@Module({
  imports: [LoggerModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
