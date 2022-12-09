import { Controller, Get, Header } from '@nestjs/common';
import { LogInterceptor } from 'src/log/log.inerceptor';
import { CatsService } from './service';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('name')
  @Header('content-type', 'application/json')
  getName() {
    return this.catsService.getNameByDataBase();
  }
}
