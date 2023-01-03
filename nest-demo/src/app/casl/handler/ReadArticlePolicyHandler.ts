import { Injectable } from '@nestjs/common';
import { AppAbility } from '../casl-ability.factory';
import { Action, IPolicyHandler } from '../constant';

@Injectable()
export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, 'all');
  }
}
