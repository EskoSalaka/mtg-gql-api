import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CardResolver } from './card.resolver';
import { HttpModule } from '@nestjs/axios';
import { Card } from './models/card.model';
import { CardFace } from './models/card-face.model';
import { Set } from 'src/set/models/set.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Card, CardFace, Set], {
      models: [Card, CardFace, Set],
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
