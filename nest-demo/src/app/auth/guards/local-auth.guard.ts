/**
 * 本地策略的 守卫
 */
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuards extends AuthGuard('local') {}
