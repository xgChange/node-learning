import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getName() {
    return {
      name: 'myName',
    };
  }
}
