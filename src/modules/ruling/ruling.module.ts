import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from 'src/modules/card/models/card.model';
import { RulingResolver } from './ruling.resolver';
import { Ruling } from './models/ruling.model';
import { CardFace } from '../card/models/card-face.model';
import { LatestPrice } from '../card/models/price.model';
import { CardModule } from '../card/card.module';

@Module({
  imports: [SequelizeModule.forFeature([Ruling, Card, CardFace, LatestPrice]), CardModule],
  providers: [RulingResolver, Logger],
  exports: [SequelizeModule],
})
export class RulingModule {}
