import { Field, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import Color from '../types/color.type';
import { CardImagery } from '../types/card-imagery.type';
import { Expose, Transform, Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsEnum, IsOptional } from 'class-validator';

@ObjectType()
export class CardFaceDTO {
  @Expose()
  @IsOptional()
  artist: string | null = null;

  @Expose()
  @IsOptional()
  artist_id: string | null = null;

  @Expose()
  @IsOptional()
  cmc: number | null = null;

  @Expose()
  @IsOptional()
  @IsEnum(Color, { each: true })
  color_indicator?: Color[] | null = null;

  @Expose()
  @IsOptional()
  @IsEnum(Color, { each: true })
  colors?: Color[] | null = null;

  @Expose()
  @IsOptional()
  defense: string | null = null;

  @Expose()
  @IsOptional()
  flavor_text: string | null = null;

  @Expose()
  @IsOptional()
  illustration_id: string | null = null;

  @Expose()
  @IsOptional()
  image_uris: Object | null = null;

  @Expose()
  @IsOptional()
  layout: string | null = null;

  @Expose()
  @IsOptional()
  loyalty: string | null = null;

  @Expose()
  mana_cost: string;

  @Expose()
  name: string;

  @Expose()
  object: string;

  @Expose()
  @IsOptional()
  oracle_id: string | null = null;

  @Expose()
  @IsOptional()
  oracle_text: string | null = null;

  @Expose()
  @IsOptional()
  power: string | null = null;

  @Expose()
  @IsOptional()
  printed_name: string | null = null;

  @Expose()
  @IsOptional()
  printed_text: string | null = null;

  @Expose()
  @IsOptional()
  printed_type_line: string | null = null;

  @Expose()
  @IsOptional()
  toughness: string | null = null;

  @Expose()
  @IsOptional()
  type_line: string | null = null;

  @Expose()
  @IsOptional()
  watermark: string | null = null;
}
