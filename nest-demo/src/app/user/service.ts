import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/db/repositories/UserRepository';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// 标明它作为一个提供者，能让Nest IOC 去管理
@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepository: UserRepository) {
    this.users = [];
  } // 这里描述了，UserService 依赖于 OtherService

  getName() {
    return {
      name: 'myName',
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    // return this.users.find((user) => user.username === username) || undefined;
    return undefined;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password, age } = createUserDto;
    const user = new User();
    user.name = username;
    user.password = password;
    user.age = age || 18;
    return this.userRepository.save(user);
  }
}
