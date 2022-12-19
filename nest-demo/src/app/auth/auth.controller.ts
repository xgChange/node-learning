import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuards } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authServices: AuthService) {}

  @UseGuards(LocalAuthGuards)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
