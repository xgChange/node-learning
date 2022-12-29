import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/db/repositories/UserRepository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// 标明它作为一个提供者，能让Nest IOC 去管理
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {} // 这里描述了，UserService 依赖于 OtherService

  getName() {
    return {
      name: 'myName',
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return undefined;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        name: username,
      },
    });
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
