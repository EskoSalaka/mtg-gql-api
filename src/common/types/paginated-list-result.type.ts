import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info.type';
import type { DefaultQueryArgs } from './default-query-args.type';

export function PaginatedListResult<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageResult {
    @Field(() => [ItemType])
    rows: T[];

    @Field(() => PageInfo)
    page_info: PageInfo;
  }

  return PageResult;
}

export function buildPaginatedListResult<T>(
  query: DefaultQueryArgs,
  rows: Array<T>,
  count: number,
) {
  let total_pages = Math.ceil(count / query.limit);

  let page_info: PageInfo = {
    limit: query.limit,
    page: query.page,
    has_more: query.page < total_pages,
    total_rows: count,
    total_pages,
  };

  return {
    rows,
    page_info,
  };
}
