import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { doCrypto } from 'src/utils/bcrypt';

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

  // 在保存实体之前调用它
  @BeforeInsert()
  async hashPassword() {
    this.password = await doCrypto(this.password);
  }
}

export default 'ssa';
