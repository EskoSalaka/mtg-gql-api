import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WhereQueryArgs } from 'src/common/types/defaultQueryArgs.type';
import { InjectModel } from '@nestjs/sequelize';
import { CardFace } from 'src/modules/card/models/card-face.model';
import { Card } from 'src/modules/card/models/card.model';
import { Set } from './models/set.model';
const { fieldsList } = require('graphql-fields-list');
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { SetHeader } from './types/set-header';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from '../card/models/price.model';

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

  @Query(() => [SetHeader])
  async sets(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { skip: ['cards'] });

    return this.setModel.findAll({
      where: query.where,
      attributes: selectedFields,
    });
  }

  @ResolveField(() => [Card])
  async cards(@Parent() parent: Set, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, { skip: ['card_faces', 'rulings', 'prices'] });
    let cardFaceAttributes = fieldsList(context, { path: 'card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rulings' });
    let priceAttributes = fieldsList(context, { path: 'prices' });

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

    return set.cards;
  }
}
