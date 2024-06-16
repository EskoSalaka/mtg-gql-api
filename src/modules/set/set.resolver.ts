import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
import { CardFace } from 'src/modules/card/models/card-face.model';
import { Card } from 'src/modules/card/models/card.model';
import { Set } from './models/set.model';
const { fieldsList } = require('graphql-fields-list');
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from '../card/models/price.model';
import { WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { SetHeaderList } from './types/set-header-list.type';
import { CardList } from './types/card-list.type';

@Resolver(() => Set)
export class SetResolver {
  constructor(
    @InjectModel(Set)
    private setModel: typeof Set,
  ) {}

  @Query(() => Set)
  async set(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { skip: ['cards'] });

    return this.setModel.findByPk(id, {
      attributes: selectedFields,
    });
  }

  @Query(() => SetHeaderList)
  async sets(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { path: 'rows', skip: ['rows.cards', 'total_rows'] });

    let rows = await this.setModel.findAll({
      where: query.where,
      attributes: selectedFields,
    });

    return { rows, total_rows: rows.length };
  }

  @ResolveField(() => CardList)
  async cards(@Parent() parent: Set, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices', 'total_rows'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    let set = await this.setModel.findByPk(parent.id, {
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
              attributes: rulingAttributes,
              duplicating: false,
            },
            {
              model: LatestPrice,
              as: 'prices',
              attributes: priceAttributes,
              duplicating: false,
            },
          ],
        },
      ],
    });

    return { rows: set.cards, total_rows: set.cards.length };
  }
}
