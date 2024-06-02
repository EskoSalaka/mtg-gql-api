import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType({
  description: `An object describing a related card.
  
  Cards that are closely related to other cards (because they call them by name, 
  or generate a token, or meld, etc) have a all_parts property that contains 
  Related Card objects. Those objects have the following properties:`,
})
export class RelatedCardInfo {
  @Expose()
  @Field({ description: 'The ID of the related card.' })
  id: string;

  @Expose()
  @Field({ description: 'A content type for this object, always related_card. ' })
  object: string;

  @Expose()
  @Field({
    description: `A field explaining what role this card plays in this relationship, 
    one of token, meld_part, meld_result, or combo_piece. `,
  })
  component: string;

  @Expose()
  @Field({ description: 'The name of the related card.' })
  name: string;

  @Expose()
  @Field({ description: 'The type line of the related card.' })
  type_line: string;

  @Expose()
  @Field({ description: 'The URI for this card on Scryfall API.' })
  uri: string;
}
