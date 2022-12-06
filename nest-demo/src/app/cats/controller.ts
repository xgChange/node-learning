import { Controller, Get } from '@nestjs/common';
import { ReportLogger } from 'src/log/ReportLogger';
import { CatsService } from './service';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService, private logger: ReportLogger) {}

  @Get('name')
  getName() {
    this.logger.warn('这是在controller中');
    return this.catsService.getNameByDataBase();
  }
}
