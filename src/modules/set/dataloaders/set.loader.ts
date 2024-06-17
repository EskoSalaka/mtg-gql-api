import { Inject, Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { Set } from '../models/set.model';
import DataLoader from 'dataloader';
import { SetService } from '../set.service';

@Injectable()
export class SetLoader implements NestDataLoader<string, Set> {
  constructor(private setService: SetService) {}

  generateDataLoader(): DataLoader<string, Set> {
    return new DataLoader<string, Set>(async (ids) => {
      const sets = await this.setService.findAll({ where: { id: ids } });

      const setsById = sets.reduce((map, set) => {
        map[set.id] = set;
        return map;
      }, {});

      return ids.map((id) => setsById[id]);
    });
  }
}
