import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { Set } from 'src/modules/set/models/set.model';
import { Ruling } from './models/ruling.model';
import { CardFace } from './models/card-face.model';
import { Card } from './models/card.model';
import { CardResolver } from './card.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([Card, CardFace, Set, Ruling], {
      models: [Card, CardFace, Set, Ruling],
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
