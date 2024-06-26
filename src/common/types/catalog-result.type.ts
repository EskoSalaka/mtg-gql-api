import { ObjectType } from '@nestjs/graphql';
import { ListResult } from 'src/common/types/list-result.type';

@ObjectType()
export class CatalogResult extends ListResult(String) {}
