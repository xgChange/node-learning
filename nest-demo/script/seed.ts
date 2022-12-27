import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { ormConfig } from './configs';
import { User } from '../src/app/user/entities/user.entity';
import { Cats } from '../src/app/cats/entities/cats.entity';

const seed = async () => {
  const datasouce = new DataSource(ormConfig);
  const connect = await datasouce.initialize();
  const user = new User();
  const cat = new Cats();

  cat.cats_name = 'cat1';
  // cat.cats_age = 12;

  user.name = 'xmx';
  // user.cats = [cat];
  user.password = '111';
  await connect.manager.save(cat);
  await connect.manager.save(user);
  console.log('connect');
};

seed();
