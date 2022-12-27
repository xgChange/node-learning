import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cats_name: string;

  // ManytoOne也可以单独使用，也会设置外键 user_id，关联User表的主键
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
