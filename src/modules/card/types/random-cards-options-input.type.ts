import { Field, InputType, Int } from '@nestjs/graphql';
import { Allow, Max, Min } from 'class-validator';

@InputType()
export class RandomCardsOptionsInput {
  @Field({ defaultValue: 1 })
  @Allow()
  @Min(1)
  @Max(100)
  count: number;

  @Field({ defaultValue: false })
  @Allow()
  allow_dulicates: boolean;
}
