import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { CardPage } from './types/CardPage.type';
import { DefaultQueryArgs } from 'src/common/types/defaultQueryArgs.type';
import { PageInfo } from 'src/common/types/page-info.type';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Card } from './models/card.model';
import { CardFace } from './models/card-face.model';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import * as _ from 'lodash';
import { Logger } from '@nestjs/common';
import { replaceKeysDeep } from './utils';
import { Ruling } from './models/ruling.model';
import { GraphQLError } from 'graphql';

@Resolver(() => Card)
export class CardResolver {
  private readonly logger = new Logger(CardResolver.name);
  constructor(
    @InjectModel(Card)
    private cardModel: typeof Card,
  ) {}

  @Query(() => Card)
  async card(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, { path: 'rows', skip: ['rows.card_faces'] });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });

    return this.cardModel.findByPk(id, {
      include: [{ model: CardFace, attributes: cardFaceAttributes }],
      attributes: cardAttributes,
    });
  }

  @Query(() => CardPage)
  async cards(@Args() query: DefaultQueryArgs, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });

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

    let mergedAttrmaps = {
      ...topLevelCardAttrMap,
      ...topLevelCardFaceAttrMap,
      ...topLevelRulingAttrMap,
    };
    let mappedWhere = replaceKeysDeep(query.where, mergedAttrmaps);

    let count = await this.cardModel.count({
      distinct: true,
      where: mappedWhere as any,
      include: [CardFace, Ruling],
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
      ],
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
