import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuards } from './guards/local-auth.guard';
import { SkipJwtAuth } from './constants';

@Controller('/auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(LocalAuthGuards)
  @SkipJwtAuth()
  @Post('login')
  async login(@Request() req) {
    return this.authServices.login(req.user);
  }
}
