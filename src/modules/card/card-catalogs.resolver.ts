import { Query, Resolver } from '@nestjs/graphql';
import { Card } from './models/card.model';
import { InjectModel } from '@nestjs/sequelize';
import _ from 'lodash';
import { Logger } from '@nestjs/common';
import { CatalogResult } from 'src/common/types/catalog-result.type';
import { Op, Sequelize } from 'sequelize';

@Resolver()
export class CardCatalogResolver {
  private readonly logger = new Logger(CardCatalogResolver.name);
  constructor(
    @InjectModel(Card)
    private cardModel: typeof Card,
  ) {}

  @Query(() => CatalogResult)
  async card_names() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'name',
      attributes: [[Sequelize.literal('DISTINCT `name`'), 'name']],
      order: [['name', 'ASC']],
    });

    return { rows: result.rows.map((r) => r.name), total_rows: result.count };
  }

  @Query(() => CatalogResult)
  async card_watermarks() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'watermark',
      attributes: [[Sequelize.literal('DISTINCT `watermark`'), 'watermark']],
      order: [['watermark', 'ASC']],
      where: {
        watermark: {
          [Op.not]: null,
        },
      },
    });

    return { rows: result.rows.map((r) => r.watermark), total_rows: result.count };
  }

  @Query(() => CatalogResult)
  async card_artist_names() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'artist',
      attributes: [[Sequelize.literal('DISTINCT `artist`'), 'artist']],
      order: [['artist', 'ASC']],
      where: {
        [Op.and]: [Sequelize.literal('`artist` IS NOT NULL'), Sequelize.literal('`artist` != ""')],
      },
    });

    return { rows: result.rows.map((r) => r.artist), total_rows: result.count };
  }

  @Query(() => CatalogResult)
  async card_full_basic_types() {
    let result = await this.cardModel.unscoped().findAll({
      attributes: [[Sequelize.literal('DISTINCT `type_line`'), 'type_line']],
      order: [['type_line', 'ASC']],
      where: {
        type_line: {
          [Op.not]: null,
        },
      },
    });

    let types = _(result)
      .map((r) => {
        let type = r.type_line.split(' — ')[0];
        if (type.includes('//')) {
          let sides = type.split('//');
          return sides.map((s) => s.trim());
        } else {
          return [type.trim()];
        }
      })
      .flatten()
      .uniq()
      .value();

    return { rows: types, total_rows: types.length };
  }

  @Query(() => CatalogResult)
  async card_full_types() {
    let result = await this.cardModel.unscoped().findAll({
      attributes: [[Sequelize.literal('DISTINCT `type_line`'), 'type_line']],
      order: [['type_line', 'ASC']],
      where: {
        type_line: {
          [Op.not]: null,
        },
      },
    });

    let types = _(result)
      .map((r) => {
        let type = r.type_line.split(' — ')[1];

        if (type) {
          if (type.includes('//')) {
            let sides = type.split('//');
            return sides.map((s) => s.trim());
          } else {
            return [type.trim()];
          }
        }
      })
      .filter(Boolean)
      .flatten()
      .uniq()
      .value();

    return { rows: types, total_rows: types.length };
  }

  @Query(() => CatalogResult)
  async card_powers() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'power',
      attributes: [[Sequelize.literal('DISTINCT `power`'), 'power']],
      order: [['power', 'ASC']],
      where: {
        power: {
          [Op.not]: null,
        },
      },
    });

    return { rows: result.rows.map((r) => r.power), total_rows: result.count };
  }

  @Query(() => CatalogResult)
  async card_toughnesses() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'toughness',
      attributes: [[Sequelize.literal('DISTINCT `toughness`'), 'toughness']],
      order: [['toughness', 'ASC']],
      where: {
        toughness: {
          [Op.not]: null,
        },
      },
    });

    return { rows: result.rows.map((r) => r.toughness), total_rows: result.count };
  }

  @Query(() => CatalogResult)
  async card_loyalties() {
    let result = await this.cardModel.unscoped().findAndCountAll({
      distinct: true,
      col: 'loyalty',
      attributes: [[Sequelize.literal('DISTINCT `loyalty`'), 'loyalty']],
      order: [['loyalty', 'ASC']],
      where: {
        loyalty: {
          [Op.not]: null,
        },
      },
    });

    return { rows: result.rows.map((r) => r.loyalty), total_rows: result.count };
  }
}
