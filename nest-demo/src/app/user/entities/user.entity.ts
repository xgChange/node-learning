import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  /**
   * 自增ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 用户名
   */
  @Column()
  name: string;

  /**
   * 密码
   */
  @Exclude()
  @Column()
  password: string;

  /**
   * 年龄
   */
  @Column()
  age: number;
}

export default 'ssa';
