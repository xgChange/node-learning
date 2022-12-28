import { User } from 'src/app/user/entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {}
