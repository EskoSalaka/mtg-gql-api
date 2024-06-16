import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SetResolver } from './set.resolver';
import { Set } from './models/set.model';
import { Card } from 'src/modules/card/models/card.model';
import { SetLoader } from './dataloaders/set.loader';

@Module({
  imports: [SequelizeModule.forFeature([Set, Card])],
  providers: [SetResolver, SetLoader],
  exports: [SequelizeModule, SetLoader],
})
export class SetModule {}
