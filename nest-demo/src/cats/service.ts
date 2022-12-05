import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getNameByDataBase() {
    return {
      name: 'xxx',
      nickname: 'fff',
    };
  }
}
