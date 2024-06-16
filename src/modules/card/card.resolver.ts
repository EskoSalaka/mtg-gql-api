import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Card } from './models/card.model';
const { fieldsList } = require('graphql-fields-list');
import * as _ from 'lodash';
import { Inject, Logger } from '@nestjs/common';
import { DefaultQueryArgs, WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { CardPage } from './types/card-page.type';
import { CardService } from './card.service';

@Resolver()
export class CardResolver {
  private readonly logger = new Logger(CardResolver.name);

  constructor(@Inject(CardService) private cardService: CardService) {}

  @Query(() => Card)
  async card(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rulings' });
    let priceAttributes = fieldsList(context, { path: 'prices' });

    return this.cardService.findone(id, {
      cardAttributes,
      cardFaceAttributes,
      rulingAttributes,
      priceAttributes,
    });
  }

  @Query(() => CardPage)
  async cards(@Args() query: DefaultQueryArgs, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    return this.cardService.find(query, {
      cardAttributes,
      cardFaceAttributes,
      rulingAttributes,
      priceAttributes,
    });
  }

  @Query(() => Card)
  async random_card(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rulings' });
    let priceAttributes = fieldsList(context, { path: 'prices' });

    return this.cardService.findOneRandom(query, {
      cardAttributes,
      cardFaceAttributes,
      rulingAttributes,
      priceAttributes,
    });
  }
}
