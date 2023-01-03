import { Module } from '@nestjs/common';
import { CalsAbilityFactory } from './casl-ability.factory';

@Module({
  providers: [CalsAbilityFactory],
  exports: [CalsAbilityFactory],
})
export class CalsModule {}
