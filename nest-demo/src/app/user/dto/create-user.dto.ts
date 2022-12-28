import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * 用户名
   */
  @IsString()
  username: string;

  /**
   * 密码
   */
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  age?: number = 18;
}
