import { IsString } from 'class-validator';

export class LoginDto {
  /**
   * 账户
   * @example "username = 'john'"
   */
  @IsString()
  username: string;

  /**
   * 密码
   * @example "password = '1'"
   */
  @IsString()
  password: string;
}
