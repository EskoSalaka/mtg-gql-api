import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SetResolver } from './set.resolver';
import { Set } from './models/set.model';
import { Card } from 'src/modules/card/models/card.model';

@Module({
  imports: [SequelizeModule.forFeature([Set, Card])],
  providers: [SetResolver],
  exports: [SequelizeModule],
})
export class SetModule {}
