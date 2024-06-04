import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Legality {
  legal = 'legal',
  not_legal = 'not_legal',
  restricted = 'restricted',
  banned = 'banned',
}

registerEnumType(Legality, {
  name: 'Legality',
  description: `
  An object describing the legality of a card across play formats. Possible legalities are legal, not_legal, restricted, and banned. 
  `,
  valuesMap: {
    legal: {
      description: 'Legal',
    },
    not_legal: {
      description: 'Not Legal',
    },
    restricted: {
      description: 'Restricted',
    },
    banned: {
      description: 'Banned',
    },
  },
});

@ObjectType({ description: 'An object describing the legality of a card across play formats.' })
export class Legalities {
  @Field(() => Legality, { nullable: true })
  standard: Legality | null;

  @Field(() => Legality, { nullable: true })
  future: Legality | null;

  @Field(() => Legality, { nullable: true })
  historic: Legality | null;

  @Field(() => Legality, { nullable: true })
  timeless: Legality | null;

  @Field(() => Legality, { nullable: true })
  gladiator: Legality | null;

  @Field(() => Legality, { nullable: true })
  pioneer: Legality | null;

  @Field(() => Legality, { nullable: true })
  explorer: Legality | null;

  @Field(() => Legality, { nullable: true })
  modern: Legality | null;

  @Field(() => Legality, { nullable: true })
  legacy: Legality | null;

  @Field(() => Legality, { nullable: true })
  pauper: Legality | null;

  @Field(() => Legality, { nullable: true })
  vintage: Legality | null;

  @Field(() => Legality, { nullable: true })
  penny: Legality | null;

  @Field(() => Legality, { nullable: true })
  commander: Legality | null;

  @Field(() => Legality, { nullable: true })
  oathbreaker: Legality | null;

  @Field(() => Legality, { nullable: true })
  standardbrawl: Legality | null;

  @Field(() => Legality, { nullable: true })
  brawl: Legality | null;

  @Field(() => Legality, { nullable: true })
  alchemy: Legality | null;

  @Field(() => Legality, { nullable: true })
  paupercommander: Legality | null;

  @Field(() => Legality, { nullable: true })
  duel: Legality | null;

  @Field(() => Legality, { nullable: true })
  oldschool: Legality | null;

  @Field(() => Legality, { nullable: true })
  premodern: Legality | null;

  @Field(() => Legality, { nullable: true })
  predh: Legality | null;
}
