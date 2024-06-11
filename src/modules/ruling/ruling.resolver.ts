import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DefaultQueryArgs } from 'src/common/types/defaultQueryArgs.type';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import { Ruling } from '../ruling/models/ruling.model';
import { RulingPage } from './types/rulings-page';
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import type { PageInfo } from 'src/common/types/page-info.type';

@Resolver(() => Ruling)
export class RulingResolver {
  constructor(
    @InjectModel(Ruling)
    private rulingModel: typeof Ruling,
  ) {}

  @Query(() => RulingPage)
  async rulings(@Args() query: DefaultQueryArgs, @Info() context: ExecutionContextHost) {
    const rulingAttributes = fieldsList(context, {
      path: 'rows',
    });

    let count = await this.rulingModel.count({
      distinct: true,
      where: query.where,
    });

    let rows = await this.rulingModel.findAll({
      limit: query.limit,
      offset: query.limit * (query.page - 1),
      where: query.where,
      attributes: rulingAttributes,
    });

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
}
