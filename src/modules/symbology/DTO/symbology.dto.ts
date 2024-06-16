import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import Color from 'src/modules/card/types/color.type';

export class SymbologyDTO {
  @Expose()
  @IsString()
  object: string;

  @Expose()
  @IsString()
  symbol: string;

  @Expose()
  @IsString()
  svg_uri: string;

  @Expose()
  @IsOptional()
  @IsString()
  loose_variant: string | null = null;

  @Expose()
  @IsString()
  english: string;

  @Expose()
  @IsBoolean()
  transposable: boolean;

  @Expose()
  @IsBoolean()
  represents_mana: boolean;

  @Expose()
  @IsBoolean()
  appears_in_mana_costs: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  mana_value: number | null = null;

  @Expose()
  @IsBoolean()
  hybrid: boolean;

  @Expose()
  @IsBoolean()
  phyrexian: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  cmc: number | null = null;

  @Expose()
  @IsBoolean()
  funny: boolean;

  @Expose()
  @IsOptional()
  @IsArray()
  @IsEnum(Color, { each: true })
  @ValidateIf((object, value) => value !== null)
  colors: Color[] = [];

  @Expose()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ValidateIf((object, value) => value !== null)
  gatherer_alternates: string[] | null = null;
}
