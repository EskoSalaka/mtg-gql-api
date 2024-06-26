import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import { Ruling } from '../ruling/models/ruling.model';
import { RulingHeaderPage } from './types/rulings-page';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import type { PageInfo } from 'src/common/types/page-info.type';
import { Card } from '../card/models/card.model';
import { CardFace } from '../card/models/card-face.model';
import { LatestPrice } from '../card/models/price.model';
import _ from 'lodash';
import { DefaultQueryArgs } from 'src/common/types/default-query-args.type';
import { EntityNotFoundException } from 'src/common/exceptions/entity-not-found.exception';

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

    let ruling = await this.rulingModel.findByPk(id, {
      attributes: rulingAttributes,
    });

    if (!ruling) {
      throw new EntityNotFoundException('Ruling', id);
    }

    return ruling;
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

  @ResolveField(() => Card)
  async cards(@Parent() parent: Ruling, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'card_faces' });
    let rulingSubAttributes = fieldsList(context, { path: 'rulings' });

    let ruling = await this.rulingModel.findByPk(parent.id, {
      include: [
        {
          model: Card,
          attributes: cardAttributes,
          include: [
            {
              model: CardFace,
              attributes: cardFaceAttributes,
              duplicating: false,
            },
            {
              model: Ruling,
              as: 'rulings',
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

    return ruling.cards;
  }
}
