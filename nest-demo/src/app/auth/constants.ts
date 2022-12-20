import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'secretKey',
  expireIn: 3, // 分钟
};

export const USER_NOT_FOUND_ERROR = 'user not found';

export const PASSWORD_ERROR = 'password error';

export const IS_PUBLIC_KEY = 'is_public';

// setMetaData 底部已经实现了在 target 中defineMetadata
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
