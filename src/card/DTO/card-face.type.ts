import { Field, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import Color from '../types/color.type';
import { CardImagery } from '../types/card-imagery.type';
import { Expose, Transform, Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

@ObjectType()
export class CardFaceDTO {
  @Expose()
  artist: string | null = null;

  @Expose()
  artist_id: string | null = null;

  @Expose()
  cmc: number | null = null;

  @Expose()
  color_indicator?: Color[] | null = null;

  @Expose()
  colors: Color[] | null = null;

  @Expose()
  defense: string | null = null;

  @Expose()
  flavor_text: string | null = null;

  @Expose()
  illustration_id: string | null = null;

  @Expose()
  image_uris: Object | null = null;

  @Expose()
  layout: string | null = null;

  @Expose()
  loyalty: string | null = null;

  @Expose()
  mana_cost: string;

  @Expose()
  name: string;

  @Expose()
  object: string;

  @Expose()
  oracle_id: string | null = null;

  @Expose()
  oracle_text: string | null = null;

  @Expose()
  power: string | null = null;

  @Expose()
  printed_name: string | null = null;

  @Expose()
  printed_text: string | null = null;

  @Expose()
  printed_type_line: string | null = null;

  @Expose()
  toughness: string | null = null;

  @Expose()
  type_line: string | null = null;

  @Expose()
  watermark: string | null = null;
}
