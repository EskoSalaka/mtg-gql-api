import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/common/types/page-info.type';
import { Ruling } from '../models/ruling.model';

@ObjectType()
export class RulingPage {
  @Field(() => [Ruling])
  rows: Ruling[];

  @Field(() => PageInfo)
  page_info: PageInfo;
}
