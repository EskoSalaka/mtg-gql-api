import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function ListResult<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class ListResult {
    @Field(() => [ItemType])
    rows: T[];

    @Field(() => Int)
    total_rows: number;
  }

  return ListResult;
}
