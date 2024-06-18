import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DefaultQueryArgs, type WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { CardFace } from './models/card-face.model';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from './models/price.model';
import { replaceKeysDeep } from './utils';
import { Card } from './models/card.model';
import { Sequelize } from 'sequelize-typescript';
import { EntityNotFoundException } from 'src/common/exceptions/entity-not-found.exception';
import { RandomCardGenerationException } from './exceptions/random-card-generation.exception';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

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

    if (!card) {
      throw new EntityNotFoundException('Card', id);
    }

    return card;
  }

  async findAll(
    query: DefaultQueryArgs,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
    let topLevelWhere = this._toTopLevelAttributes(query.where);

    let rows = await this.cardModel.findAll({
      limit: query.limit,
      offset: query.limit * (query.page - 1),
      attributes: fields.cardAttributes,
      where: topLevelWhere as any,
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

    return rows;
  }

  async findAndCountAll(
    query: DefaultQueryArgs,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
    let count = await this.countAll(query.where);
    let rows = await this.findAll(query, fields);

    return { count, rows };
  }

  async countAll(where: DefaultQueryArgs['where']) {
    let topLevelWhere = this._toTopLevelAttributes(where);

    let count = await this.cardModel.count({
      distinct: true,
      where: topLevelWhere as any,
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

    return count;
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
    let result = await this.findAll(
      { limit: 1, where: query.where, order: this.sequelize.random(), page: 1 },
      fields,
    );

    if (result.length === 0) {
      this.logger.error('Failed to generate random card');
      throw new RandomCardGenerationException();
    }

    return result[0];
  }

  async findManyRandom(
    count: number,
    allow_duplicates: boolean,
    query: WhereQueryArgs,
    fields: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
    let results;

    if (allow_duplicates) {
      results = await Promise.all(
        Array.from({ length: count }).map(async () => {
          let result = await this.findOneRandom(query, fields);

          return result;
        }),
      );
    } else {
      results = await this.findAll(
        { limit: count, where: query.where, order: this.sequelize.random(), page: 1 },
        fields,
      );
    }

    if (results.length < count) {
      this.logger.error('Failed to generate random cards');
      throw new RandomCardGenerationException();
    }

    return results;
  }

  _toTopLevelAttributes(where: WhereQueryArgs['where']) {
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

    let mappedWhere = replaceKeysDeep(where, mergedAttrmaps);

    return mappedWhere;
  }
}
