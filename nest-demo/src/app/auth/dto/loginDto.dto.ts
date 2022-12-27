import { IsString } from 'class-validator';

export class LoginDto {
  /**
   * 账户
   * @example "john"
   */
  @IsString()
  username: string;

  /**
   * 密码
   * @example "1"
   */
  @IsString()
  password: string;
}
