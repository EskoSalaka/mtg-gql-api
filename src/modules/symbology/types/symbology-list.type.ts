import { ObjectType } from '@nestjs/graphql';
import { ListResult } from 'src/common/types/list-result.type';
import { Symbology } from '../models/symbology.model';

@ObjectType()
export class SymbologyList extends ListResult(Symbology) {}
