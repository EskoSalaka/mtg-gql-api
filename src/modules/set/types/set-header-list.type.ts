import { ObjectType } from '@nestjs/graphql';
import { ListResult } from 'src/common/types/list-result.type';
import { SetHeader } from './set-header';

@ObjectType()
export class SetHeaderList extends ListResult(SetHeader) {}
