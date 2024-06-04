import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class SetDTO {
  //Core Set Fields
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  object: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsOptional()
  mtgo_code: string | null = null;

  @Expose()
  @IsOptional()
  arena_code: string | null = null;

  @Expose()
  @IsOptional()
  tcgplayer_id: number | null = null;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  set_type: string;

  @Expose()
  @IsDateString()
  released_at: string;

  @Expose()
  @IsOptional()
  @IsString()
  block_code: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  block: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  parent_set_code: string | null = null;

  @Expose()
  @IsNumber()
  card_count: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  printed_size: number | null = null;

  @Expose()
  @IsBoolean()
  digital: boolean;

  @Expose()
  @IsBoolean()
  foil_only: boolean;

  @Expose()
  @IsBoolean()
  nonfoil_only: boolean;

  @Expose()
  @IsUrl()
  scryfall_uri: string;

  @Expose()
  @IsUrl()
  uri: string;

  @Expose()
  @IsUrl()
  icon_svg_uri: string;

  @Expose()
  @IsUrl()
  search_uri: string;
}
