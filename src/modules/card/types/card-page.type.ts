import { ObjectType } from '@nestjs/graphql';
import { PaginatedListResult } from 'src/common/types/paginated-list-result.type';
import { Card } from '../models/card.model';

@ObjectType()
export class CardPage extends PaginatedListResult(Card) {}
