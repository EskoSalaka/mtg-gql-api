import { Field, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import Color from '../types/color.type';
import { CardImagery } from '../types/card-imagery.type';
import { Expose, Transform, Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CardFace } from '../models/card-face.model';

@ObjectType()
export class CardFaceDTO {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsUUID()
  card_id: string;

  @Expose()
  @IsOptional()
  @IsString()
  artist: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  artist_id: string | null = null;

  @Expose()
  @IsOptional()
  @IsNumber()
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
  @IsString()
  defense: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  flavor_text: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  illustration_id: string | null = null;

  @Expose()
  @IsOptional()
  image_uris: Object | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  layout: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  loyalty: string | null = null;

  @Expose()
  @IsString()
  mana_cost: string;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  object: string;

  @Expose()
  @IsOptional()
  @IsString()
  oracle_id: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  oracle_text: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  power: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  printed_name: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  printed_text: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  printed_type_line: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  toughness: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  type_line: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  watermark: string | null = null;
}
