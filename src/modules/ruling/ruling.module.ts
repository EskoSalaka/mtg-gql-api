import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/modules/card/models/card.model';
import { RulingResolver } from './ruling.resolver';
import { Ruling } from './models/ruling.model';

@Module({
  imports: [SequelizeModule.forFeature([Ruling, Card])],
  providers: [RulingResolver, Logger],
  exports: [SequelizeModule],
})
export class RulingModule {}
