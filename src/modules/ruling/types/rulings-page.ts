import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from 'src/common/types/page-info.type';
import { Ruling } from '../models/ruling.model';
import { RulingHeader } from './ruling-header';

@ObjectType()
export class RulingHeaderPage {
  @Field(() => [RulingHeader])
  rows: Ruling[];

  @Field(() => PageInfo)
  page_info: PageInfo;
}
