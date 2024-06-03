import { ObjectType, OmitType } from '@nestjs/graphql';
import { Set } from '../models/set.model';

@ObjectType()
export class SetHeader extends OmitType(Set, ['cards'] as const) {}
