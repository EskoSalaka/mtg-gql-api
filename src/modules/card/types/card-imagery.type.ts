import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CardImagery {
  @Expose()
  @Field({
    nullable: true,
    description:
      'A transparent, rounded full card PNG. This is the best image to use for videos or other high-quality content.',
  })
  png: string;

  @Expose()
  @Field({
    nullable: true,
    description:
      'A full card image with the rounded corners and the majority of the border cropped off. Designed for dated contexts where rounded images can’t be used.',
  })
  border_crop: string;

  @Expose()
  @Field({
    nullable: true,
    description:
      'A rectangular crop of the card’s art only. Not guaranteed to be perfect for cards with outlier designs or strange frame arrangements',
  })
  art_crop: string;

  @Expose()
  @Field({ nullable: true, description: 'A large full card image' })
  large: string;

  @Expose()
  @Field({ nullable: true, description: 'A medium-sized full card image' })
  normal: string;

  @Expose()
  @Field({
    nullable: true,
    description: 'A small full card image. Designed for use as thumbnail or list icon.',
  })
  small: string;
}
