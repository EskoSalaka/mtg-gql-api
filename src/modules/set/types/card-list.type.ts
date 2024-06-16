import { ObjectType } from '@nestjs/graphql';
import { ListResult } from 'src/common/types/list-result.type';
import { Card } from 'src/modules/card/models/card.model';

@ObjectType()
export class CardList extends ListResult(Card) {}
