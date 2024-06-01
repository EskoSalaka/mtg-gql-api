import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field()
  limit: number;

  @Field()
  page: number;

  @Field()
  has_more: boolean;

  @Field()
  total_rows: number;

  @Field()
  total_pages: number;
}
