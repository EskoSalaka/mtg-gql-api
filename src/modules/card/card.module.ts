import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { Set } from 'src/modules/set/models/set.model';
import { Ruling } from './models/ruling.model';
import { CardFace } from './models/card-face.model';
import { Card, CardRuling } from './models/card.model';
import { CardResolver } from './card.resolver';
import { LatestPrice, Price } from './models/price.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Card, CardFace, Set, Ruling, Price, LatestPrice, CardRuling], {
      models: [Card, CardFace, Set, Ruling, CardRuling, LatestPrice],
      logging(sql, timing) {
        let logger = new Logger('Sequelize');
        logger.debug(sql, 'Sequelize');
      },
    }),
    HttpModule,
  ],
  providers: [CardResolver, Logger],
  exports: [SequelizeModule],
})
export class CardModule {}
