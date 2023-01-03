import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReportLogger } from 'src/log/ReportLogger';
import { UserService } from 'src/app/user/service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private reportLogger: ReportLogger,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this.reportLogger.setContext('jwt-strartegy');
  }

  async validate(payload: any) {
    this.reportLogger.log('jwt-log');
    const res = await this.userService.findByUsername(payload.username);
    if (!res) {
      throw new UnauthorizedException();
    }
    return { ...payload };
  }
}
