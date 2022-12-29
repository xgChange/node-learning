import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { compare } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserService,
    private jwtService: JwtService,
  ) {}

  // 验证用户名和密码
  async validateUser(username: string, password: string) {
    const user = await this.userServices.findByUsername(username);
    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) return user;

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
