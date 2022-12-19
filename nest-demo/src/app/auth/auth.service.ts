import { Injectable } from '@nestjs/common';
import { UserService } from '../user/service';

@Injectable()
export class AuthService {
  constructor(private userServices: UserService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userServices.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
