import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { OtherService } from './otherService';
import { UserService } from './service';

@Controller('/user')
export class CatsController {
  // 这里对应的 service 是在 module 中provide的，按顺序来的
  constructor(private userService: UserService, private other: OtherService) {}

  @Get('name')
  getName() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.userService.getName();
  }
}
