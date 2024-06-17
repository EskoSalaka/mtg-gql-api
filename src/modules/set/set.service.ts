import { Injectable } from '@nestjs/common';
import { Set } from './models/set.model';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from '../card/models/card.model';
import { CardFace } from '../card/models/card-face.model';
import { Ruling } from '../ruling/models/ruling.model';
import { LatestPrice } from '../card/models/price.model';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set) private setModel: typeof Set) {}

  async findOne(id: string, fields?: { setAttributes: string[] }) {
    let result = await this.setModel.findByPk(id, {
      attributes: fields.setAttributes,
    });

    return result;
  }

  async findAll(query: { where: any }) {
    let result = await this.setModel.unscoped().findAll({
      where: query.where,
    });

    return result;
  }

  async cards(
    id: string,
    fields?: {
      cardAttributes: string[];
      cardFaceAttributes: string[];
      rulingAttributes: string[];
      priceAttributes: string[];
    },
  ) {
    let set: any = await this.setModel.findByPk(id, {
      include: [
        {
          model: Card,
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
        },
      ],
    });

    return set.cards;
  }
}
