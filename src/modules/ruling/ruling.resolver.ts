import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { DefaultQueryArgs } from 'src/common/types/defaultQueryArgs.type';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import { Ruling } from '../ruling/models/ruling.model';
import { RulingHeaderPage } from './types/rulings-page';
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import type { PageInfo } from 'src/common/types/page-info.type';
import { Card } from '../card/models/card.model';
import { CardFace } from '../card/models/card-face.model';
import { LatestPrice } from '../card/models/price.model';

@Resolver(() => Ruling)
export class RulingResolver {
  constructor(
    @InjectModel(Ruling)
    private rulingModel: typeof Ruling,
  ) {}

  @Query(() => Ruling)
  async ruling(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    const rulingAttributes = fieldsList(context, {
      skip: ['cards'],
    });
    let cardAttributes = fieldsList(context, {
      path: 'cards',
      skip: ['cards.card_faces', 'cards.rulings', 'cards.prices'],
    });

    let cardFaceAttributes = fieldsList(context, { path: 'cards.card_faces' });
    let rulingSubAttributes = fieldsList(context, { path: 'cards.rulings' });

    return this.rulingModel.findByPk(id, {
      attributes: rulingAttributes,
      include: [
        {
          model: Card,
          attributes: cardAttributes,
          as: 'cards',
          include: [
            {
              model: CardFace,
              attributes: cardFaceAttributes,
              duplicating: false,
            },
            {
              model: Ruling,
              attributes: rulingSubAttributes,
              duplicating: false,
            },
            {
              model: LatestPrice,
              as: 'prices',
              duplicating: false,
            },
          ],
        },
      ],
    });
  }

  @Query(() => RulingHeaderPage)
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
