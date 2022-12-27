import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/custom-pipe';
import { OtherService } from './otherService';
import { UserService } from './service';

@Controller('/user')
export class CatsController {
  // 这里对应的 service 是在 module 中provide的，按顺序来的
  constructor(private userService: UserService, private other: OtherService) {}

  // params 是指 /url/:id 这个id是params，例如 /url/ddd，id就是ddd
  @Get('name')
  getName(@Query('id', ValidationPipe) id: string, @Request() req) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new Error('错误');
    // console.log(this.userService.getName);
    console.log(req.user);
    return this.userService.getName();
  }
}
