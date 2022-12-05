import { Controller, Get } from '@nestjs/common';
import { CatsService } from './service';

@Controller('/cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('name')
  getName() {
    return this.catsService.getNameByDataBase();
  }
}
