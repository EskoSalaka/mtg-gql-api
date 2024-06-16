import { Args, Info, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Card } from './models/card.model';
import { CardFace } from './models/card-face.model';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { replaceKeysDeep } from './utils';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from './models/price.model';
import { DefaultQueryArgs } from 'src/common/types/default-query-args.type';
import { buildPaginatedListResult } from 'src/common/types/paginated-list-result.type';
import { CardPage } from './types/card-page.type';

@Resolver()
export class CardResolver {
  private readonly logger = new Logger(CardResolver.name);
  constructor(
    @InjectModel(Card)
    private cardModel: typeof Card,
  ) {}

  @Query(() => Card)
  async card(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rulings' });
    let priceAttributes = fieldsList(context, { path: 'prices' });

    return this.cardModel.findByPk(id, {
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
      attributes: cardAttributes,
    });
  }

  @Query(() => CardPage)
  async cards(@Args() query: DefaultQueryArgs, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    let topLevelCardAttrMap = Object.keys(Card.getAttributes()).reduce((acc, key) => {
      acc[key] = `$Card.${key}$`;
      return acc;
    }, {});
    let topLevelCardFaceAttrMap = Object.keys(CardFace.getAttributes()).reduce((acc, key) => {
      acc['card_faces_' + key] = `$card_faces.${key}$`;
      return acc;
    }, {});
    let topLevelRulingAttrMap = Object.keys(Ruling.getAttributes()).reduce((acc, key) => {
      acc['rulings_' + key] = `$rulings.${key}$`;
      return acc;
    }, {});
    let topLevelPriceAttrMap = Object.keys(LatestPrice.getAttributes()).reduce((acc, key) => {
      acc['prices_' + key] = `$prices.${key}$`;
      return acc;
    }, {});

    let mergedAttrmaps = {
      ...topLevelCardAttrMap,
      ...topLevelCardFaceAttrMap,
      ...topLevelRulingAttrMap,
      ...topLevelPriceAttrMap,
    };
    let mappedWhere = replaceKeysDeep(query.where, mergedAttrmaps);

    let count = await this.cardModel.count({
      distinct: true,
      where: mappedWhere as any,
      include: [
        CardFace,
        Ruling,
        {
          model: LatestPrice,
          as: 'prices',
          duplicating: false,
        },
      ],
    });

    let rows = await this.cardModel.findAll({
      limit: query.limit,
      offset: query.limit * (query.page - 1),
      attributes: cardAttributes,
      where: mappedWhere as any,
      order: query.order ? query.order : [['name', 'ASC']],
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
    });

    return buildPaginatedListResult(query, rows, count);
  }
}
