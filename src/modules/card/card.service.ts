import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DefaultQueryArgs, type WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { CardFace } from './models/card-face.model';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from './models/price.model';
import { replaceKeysDeep } from './utils';
import { buildPaginatedListResult } from 'src/common/types/paginated-list-result.type';
import { Card } from './models/card.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card)
    private readonly cardModel: typeof Card,
    private readonly sequelize: Sequelize,
  ) {}

  async findone(
    id: string,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
    let card = await this.cardModel.findByPk(id, {
      attributes: fields.cardAttributes,
      include: [
        {
          model: CardFace,
          attributes: fields.cardFaceAttributes,
          duplicating: false,
        },
        {
          model: Ruling,
          attributes: fields.rulingAttributes,
          duplicating: false,
        },
        {
          model: LatestPrice,
          as: 'prices',
          attributes: fields.priceAttributes,
          duplicating: false,
        },
      ],
    });

    return card;
  }

  async find(
    query: DefaultQueryArgs,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
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
      attributes: fields.cardAttributes,
      where: mappedWhere as any,
      order: query.order ? query.order : [['name', 'ASC']],
      include: [
        {
          model: CardFace,
          attributes: fields.cardFaceAttributes,
          duplicating: false,
        },
        {
          model: Ruling,
          attributes: fields.rulingAttributes,
          duplicating: false,
        },
        {
          model: LatestPrice,
          as: 'prices',
          attributes: fields.priceAttributes,
          duplicating: false,
        },
      ],
    });

    return buildPaginatedListResult(query, rows, count);
  }

  async findOneRandom(
    query: WhereQueryArgs,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
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

    let result = await this.cardModel.findOne({
      attributes: fields.cardAttributes,
      limit: 1,
      where: mappedWhere as any,
      order: this.sequelize.random(),
      include: [
        {
          model: CardFace,
          attributes: fields.cardFaceAttributes,
          duplicating: false,
        },
        {
          model: Ruling,
          attributes: fields.rulingAttributes,
          duplicating: false,
        },
        {
          model: LatestPrice,
          as: 'prices',
          attributes: fields.priceAttributes,
          duplicating: false,
        },
      ],
    });

    return result;
  }
}
