import { GraphQLError } from 'graphql';

export class EntityNotFoundException extends GraphQLError {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found.`, {
      extensions: {
        code: 'ENTITY_NOT_FOUND',
      },
    });
  }
}
