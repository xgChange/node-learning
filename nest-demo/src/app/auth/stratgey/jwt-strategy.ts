import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Injectable } from '@nestjs/common';
import { ReportLogger } from 'src/log/ReportLogger';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private reportLogger: ReportLogger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this.reportLogger.setContext('jwt-strartegy');
  }

  async validate(payload: any) {
    console.log('payload', payload);
    this.reportLogger.log('jwt-log');
    return {};
  }
}
