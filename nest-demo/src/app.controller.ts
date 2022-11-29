import { Controller, Get, HostParam } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({ host: ':account.localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@HostParam('account') params?) {
    console.log(params);
    return '11';
  }
}
