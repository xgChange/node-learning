import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/custom-pipe';
import { OtherService } from './otherService';
import { UserService } from './service';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SkipJwtAuth } from '../auth/constants';

@ApiTags('用户相关')
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

  @SkipJwtAuth()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: '注册' })
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async regiser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
