import { Injectable } from '@nestjs/common';
import { Set } from './models/set.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SetService {
  constructor(@InjectModel(Set) private setModel: typeof Set) {}

  async findOne(id: string, fields?: { setAttributes: string[] }) {
    let result = await this.setModel.findByPk(id, {
      attributes: fields.setAttributes,
    });

    if (!result) {
      throw new Error(`Set with id ${id} not found.`);
    }

    return result;
  }

  async findAll(
    query: { where: any },
    fields?: {
      setAttributes: string[];
    },
  ) {
    let result = await this.setModel.unscoped().findAll({
      attributes: fields.setAttributes,
      where: query.where,
    });

    return result;
  }
}
