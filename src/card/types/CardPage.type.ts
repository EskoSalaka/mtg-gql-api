import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/common/types/page-info.type';
import { Card } from '../models/card.model';

@ObjectType()
export class CardPage {
  @Field(() => [Card])
  rows: Card[];

  @Field(() => PageInfo)
  page_info: PageInfo;
}
