import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType({
  description: `An object containing daily price information for this card, including usd, 
  usd_foil, usd_etched, eur, eur_foil, eur_etched, and tix prices, as Decimals (strings). `,
})
export class Prices {
  @Expose()
  @Field(() => String, { nullable: true })
  usd: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  usd_foil: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  usd_etched: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  eur: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  eur_foil: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  eur_etched: string | null;

  @Expose()
  @Field(() => String, { nullable: true })
  tix: string | null;
}
