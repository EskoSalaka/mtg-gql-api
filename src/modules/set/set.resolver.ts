import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Set } from './models/set.model';
const { fieldsList } = require('graphql-fields-list');
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { SetHeaderList } from './types/set-header-list.type';
import { CardList } from './types/card-list.type';
import { SetService } from './set.service';
import { Inject } from '@nestjs/common';

@Resolver(() => Set)
export class SetResolver {
  constructor(private setService: SetService) {}

  @Query(() => Set)
  async set(@Args('id') id: string, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { skip: ['cards'] });

    return this.setService.findOne(id, { setAttributes: selectedFields });
  }

  @Query(() => SetHeaderList)
  async sets(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { path: 'rows', skip: ['rows.cards', 'total_rows'] });

    let rows = await this.setService.findAll(query);

    return { rows, total_rows: rows.length };
  }

  @ResolveField(() => CardList)
  async cards(@Parent() parent: Set, @Info() context: ExecutionContextHost) {
    let cardAttributes = fieldsList(context, {
      path: 'rows',
      skip: ['rows.card_faces', 'rows.rulings', 'rows.prices', 'total_rows'],
    });
    let cardFaceAttributes = fieldsList(context, { path: 'rows.card_faces' });
    let rulingAttributes = fieldsList(context, { path: 'rows.rulings' });
    let priceAttributes = fieldsList(context, { path: 'rows.prices' });

    let cards = await this.setService.cards(parent.id, {
      cardAttributes,
      cardFaceAttributes,
      rulingAttributes,
      priceAttributes,
    });

    return { rows: cards, total_rows: cards.length };
  }
}
