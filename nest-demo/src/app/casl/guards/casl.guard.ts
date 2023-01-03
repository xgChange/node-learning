import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CalsAbilityFactory } from '../casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from '../constant';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private caslAbilityFactory: CalsAbilityFactory,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.getAllAndOverride<PolicyHandler[]>(
      CHECK_POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => {
      const r = this.execPolicyHandler(handler, ability, user);
      console.log(r);
      return r;
    });
  }

  execPolicyHandler(handler: PolicyHandler, ability: AppAbility, user: any) {
    if (typeof handler === 'function') {
      return handler(ability, user);
    }
    return handler.handle(ability, user);
  }
}
