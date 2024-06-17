import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Card } from './models/card.model';
const { fieldsList } = require('graphql-fields-list');
import * as _ from 'lodash';
import { Inject, Logger } from '@nestjs/common';
import { DefaultQueryArgs, WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { CardPage } from './types/card-page.type';
import { CardService } from './card.service';
import { Set } from '../set/models/set.model';
import type DataLoader from 'dataloader';
import { SetLoader } from '../set/dataloaders/set.loader';
import { Loader } from 'src/common/interceptors/dataloader.interceptor';
import { buildPaginatedListResult } from 'src/common/types/paginated-list-result.type';
import { CardList } from '../set/types/card-list.type';
import { RandomCardsOptionsInput } from './types/random-cards-options-input.type';

@Resolver(() => Card)
export class CardResolver {
  private readonly logger = new Logger(CardResolver.name);

  constructor(@Inject(CardService) private cardService: CardService) {}

  @Query(() => Card)
  async card(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices', 'set'],
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
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices', 'rows.set'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    let { count, rows } = await this.cardService.findAndCountAll(query, {
      cardAttributes,
      cardFaceAttributes,
      rulingAttributes,
      priceAttributes,
    });

    return buildPaginatedListResult(query, rows, count);
  }

  @Query(() => Card)
  async random_card(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      skip: ['card_faces', 'rulings', 'prices', 'set'],
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

  @Query(() => CardList)
  async random_cards(
    @Args('options') options: RandomCardsOptionsInput,
    @Args() query: WhereQueryArgs,
    @Info() context: ExecutionContextHost,
  ) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices', 'rows.set'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    let rows = await this.cardService.findManyRandom(
      options.count,
      options.allow_dulicates,
      query,
      {
        cardAttributes,
        cardFaceAttributes,
        rulingAttributes,
        priceAttributes,
      },
    );

    return { rows, total_rows: options.count };
  }

  @ResolveField(() => Set)
  async set(@Parent() parent: Card, @Loader(SetLoader) setLoader: DataLoader<Set['id'], Set>) {
    return setLoader.load(parent.set_id);
  }
}
