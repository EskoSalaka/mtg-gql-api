import { ObjectType, OmitType } from '@nestjs/graphql';
import { Ruling } from '../models/ruling.model';

@ObjectType()
export class RulingHeader extends OmitType(Ruling, ['cards'] as const) {}
