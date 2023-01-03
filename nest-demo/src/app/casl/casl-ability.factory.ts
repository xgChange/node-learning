import {
  InferSubjects,
  AbilityBuilder,
  PureAbility,
  ExtractSubjectType,
  ConditionsMatcher,
  MatchConditions,
  AbilityClass,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Action } from './constant';

type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

const lambdaMatcher: ConditionsMatcher<MatchConditions> = (matchConditions) =>
  matchConditions;

@Injectable()
export class CalsAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      PureAbility as AbilityClass<AppAbility>,
    );
    if (user.name === 'xmx1') {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Read, User);
    }

    const r = build({
      detectSubjectType: (object) => {
        return object.constructor as ExtractSubjectType<Subjects>;
      },
      conditionsMatcher: lambdaMatcher as any,
    });
    return r;
  }
}
