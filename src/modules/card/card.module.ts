import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { Set } from 'src/modules/set/models/set.model';
import { Ruling } from '../ruling/models/ruling.model';
import { CardFace } from './models/card-face.model';
import { Card } from './models/card.model';
import { CardResolver } from './card.resolver';
import { LatestPrice, Price } from './models/price.model';
import { CardCatalogResolver } from './card-catalogs.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([Card, CardFace, Set, Ruling, Price, LatestPrice], {}),
    HttpModule,
  ],
  providers: [CardResolver, Logger, CardCatalogResolver],
  exports: [SequelizeModule],
})
export class CardModule {}
