import { Injectable } from '@nestjs/common';
import { ReportLogger } from 'src/log/ReportLogger';

@Injectable()
export class CatsService {
  constructor(private logger: ReportLogger) {
    this.logger.setContext('CatsService');
  }

  getNameByDataBase() {
    this.logger.log('这是catsService-getNameByData');
    return {
      name: 'xxx',
      nickname: 'fff',
    };
  }
}
