import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CatalogResult {
  @Field(() => [String])
  rows: string[];

  @Field(() => Int)
  total_rows: number;
}
