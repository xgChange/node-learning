import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户名和密码
  async validateUser(username: string, pass: string) {
    const user = await this.userServices.findOne(username);
    if (user) {
      if (user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return {};
    }
    return null;
  }

  async login(user: any) {
    const { password, ...res } = user;
    const payload = { username: user.username, sub: user.userId };

    return {
      token: this.jwtService.sign(payload),
      user: res,
      expiresIn: jwtConstants.expireIn * 60,
    };
  }
}
