import { Injectable } from '@nestjs/common';
import { OtherService } from './otherService';

// 标明它作为一个提供者，能让Nest IOC 去管理
@Injectable()
export class UserService {
  constructor(private otherService: OtherService) {} // 这里描述了，UserService 依赖于 OtherService

  getName() {
    return {
      name: 'myName',
    };
  }
}
