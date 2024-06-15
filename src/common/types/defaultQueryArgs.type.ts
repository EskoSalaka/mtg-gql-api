import { Field, Int, ArgsType } from '@nestjs/graphql';
import { Order, WhereOptions } from 'sequelize';

import { JSONObjectResolver } from 'graphql-scalars';
import { Transform } from 'class-transformer';
import { argsToFindOptions } from 'graphql-sequelize';
import { Allow, Max, Min } from 'class-validator';

@ArgsType()
export class DefaultQueryArgs {
  @Field(() => Int, { nullable: true, defaultValue: 100 })
  @Allow()
  @Min(1)
  @Max(100)
  limit: number;

  @Field(() => String, { nullable: true })
  @Allow()
  @Transform((tsParams) => argsToFindOptions.default({ order: tsParams.value }).order)
  order: Order;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @Allow()
  @Min(1)
  page: number = 1;

  @Field(() => JSONObjectResolver, { nullable: true })
  @Allow()
  @Transform((tsParams) => argsToFindOptions.default({ where: tsParams.value }).where)
  where: WhereOptions;
}

@ArgsType()
export class WhereQueryArgs extends DefaultQueryArgs {
  @Field(() => JSONObjectResolver, { nullable: true })
  @Allow()
  @Transform((tsParams) => argsToFindOptions.default({ where: tsParams.value }).where)
  where: WhereOptions;
}
