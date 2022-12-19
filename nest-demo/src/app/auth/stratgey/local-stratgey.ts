/**
 * 本地验证
 */

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReportLogger } from 'src/log/ReportLogger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private reportLogger: ReportLogger,
  ) {
    super();
    this.reportLogger.setContext('localStrategy');
  }

  // 自己实现的validate，如果成功了，他会调用这个函数的返回结果，往req上添加一个 user 的key
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.reportLogger.error('未授权');
      throw new UnauthorizedException();
    }
    return user;
  }
}
