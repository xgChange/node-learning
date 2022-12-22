import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuards } from './guards/local-auth.guard';
import { SkipJwtAuth } from './constants';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/loginDto.dto';

@ApiTags('登陆验证')
@Controller('/auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @ApiBody({ type: LoginDto })
  @SkipJwtAuth()
  @UseGuards(LocalAuthGuards)
  @Post('login')
  async login(@Request() req) {
    return this.authServices.login(req.user);
  }
}
