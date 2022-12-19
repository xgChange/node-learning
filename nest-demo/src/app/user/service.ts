import { Injectable } from '@nestjs/common';
import { OtherService } from './otherService';

// 标明它作为一个提供者，能让Nest IOC 去管理

type User = {
  userId: number;
  username: string;
  password: string;
};
@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(private otherService: OtherService) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: '1',
      },
      {
        userId: 2,
        username: 'chris',
        password: '2',
      },
      {
        userId: 3,
        username: 'maria',
        password: '3',
      },
    ];
  } // 这里描述了，UserService 依赖于 OtherService

  getName() {
    return {
      name: 'myName',
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username) || undefined;
  }
}
