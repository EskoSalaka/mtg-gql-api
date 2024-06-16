import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/sequelize';
const { fieldsList } = require('graphql-fields-list');
import type { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { WhereQueryArgs } from 'src/common/types/default-query-args.type';
import { Symbology } from './models/symbology.model';
import { SymbologyList } from './types/symbology-list.type';
import { replaceKeysDeep } from '../card/utils';

@Resolver(() => Symbology)
export class SymbologyResolver {
  constructor(
    @InjectModel(Symbology)
    private symbologyModel: typeof Symbology,
  ) {}

  @Query(() => SymbologyList)
  async symbology(@Args() query: WhereQueryArgs, @Info() context: ExecutionContextHost) {
    let selectedFields = fieldsList(context, { path: 'rows' });

    let topLevelSymbologyAttrMap = Object.keys(Symbology.getAttributes()).reduce((acc, key) => {
      acc[key] = `$Symbology.${key}$`;
      return acc;
    }, {});

    let mappedWhere = replaceKeysDeep(query.where, topLevelSymbologyAttrMap);

    let rows = await this.symbologyModel.findAll({
      where: mappedWhere as any,
      attributes: selectedFields,
    });

    return { rows, total_rows: rows.length };
  }
}
