import { GraphQLError } from 'graphql';

export class RandomCardGenerationException extends GraphQLError {
  constructor() {
    super(`Unable to generate random cards for the given parameters.`, {
      extensions: {
        code: 'RANDOM_CARD_GENERATION_ERROR',
      },
    });
  }
}
