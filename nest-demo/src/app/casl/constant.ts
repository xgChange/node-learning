export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

import { SetMetadata } from '@nestjs/common';
import { AppAbility } from '../casl/casl-ability.factory';

export const CHECK_POLICIES_KEY = 'check_policy';

export interface IPolicyHandler {
  handle(ability: AppAbility, ...ret: any[]): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility, ...ret: any[]) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CheckPolicies = (...handler: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handler);
