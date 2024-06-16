import { ObjectType, OmitType } from '@nestjs/graphql';
import { Card } from '../models/card.model';

@ObjectType()
export class CardHeader extends OmitType(Card, ['Set'] as const) {}
