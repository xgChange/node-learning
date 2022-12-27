import { Cats } from '../src/app/cats/entities/cats.entity';
import { User } from '../src/app/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  database: 'nest_demo',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '111111',
  entities: [Cats, User],
  synchronize: true,
};
