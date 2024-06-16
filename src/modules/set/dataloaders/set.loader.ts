import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { Set } from '../models/set.model';
import { InjectModel } from '@nestjs/sequelize';
import DataLoader from 'dataloader';

@Injectable()
export class SetLoader implements NestDataLoader<string, Set> {
  constructor(
    @InjectModel(Set)
    private setModel: typeof Set,
  ) {}

  generateDataLoader(): DataLoader<string, Set> {
    return new DataLoader<string, Set>(async (ids) => {
      const sets = await this.setModel.unscoped().findAll({ where: { id: ids } });
      const setsById = sets.reduce((map, set) => {
        map[set.id] = set;
        return map;
      }, {});

      return ids.map((id) => setsById[id]);
    });
  }
}
