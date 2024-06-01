import Language from '../types/language.type';
import Layout from '../types/layout.type';
import { CardFaceDTO } from './card-face.type';
import Color from '../types/color.type';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Optional } from '@nestjs/common';
import { log } from 'console';

export class CardDTO {
  //Core Card Fields
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsEnum(Language)
  @IsDefined()
  lang: Language;

  @Expose()
  @IsOptional()
  @IsNumber()
  arena_id: number | null = null;

  @Expose()
  @IsNumber()
  @IsOptional()
  mtgo_id: number | null = null;

  @Expose()
  @IsNumber()
  @IsOptional()
  mtgo_foil_id: number | null = null;

  @Expose()
  @IsNumber({}, { each: true })
  @IsOptional()
  multiverse_ids: number[] | null = null;

  @Expose()
  @IsOptional()
  @IsNumber()
  tcgplayer_id: number | null = null;

  @Expose()
  @IsOptional()
  @IsNumber()
  tcgplayer_etched_id: number | null = null;

  @Expose()
  @IsOptional()
  cardmarket_id: number | null = null;

  @Expose()
  @IsDefined()
  object: string;

  @Expose()
  @IsString()
  layout: string;

  @Expose()
  @IsOptional()
  oracle_id: string | null = null;

  @Expose()
  @IsUrl()
  prints_search_uri: string;

  @Expose()
  @IsUrl()
  rulings_uri: string;

  @Expose()
  @IsUrl()
  scryfall_uri: string;

  @Expose()
  @IsDefined()
  uri: string;

  //Gameplay Fields
  @Expose()
  @IsOptional()
  @IsArray()
  all_parts: any | null = null;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardFaceDTO)
  card_faces: CardFaceDTO[] = [];

  @Expose()
  @IsDefined()
  cmc: number;

  @Expose()
  @IsDefined()
  @IsEnum(Color, { each: true })
  color_identity: Color[];

  @Expose()
  @IsOptional()
  @IsEnum(Color, { each: true })
  color_indicator: Color[] | null = null;

  @Expose()
  @IsOptional()
  @IsEnum(Color, { each: true })
  colors: Color[] | null = null;

  @Expose()
  @IsOptional()
  defense: string | null = null;

  @Expose()
  @IsOptional()
  edhrec_rank: number | null = null;

  @Expose()
  @IsOptional()
  hand_modifier: string | null = null;

  @Expose()
  @IsString({ each: true })
  keywords: string[];

  @Expose()
  @IsDefined()
  legalities: object;

  @Expose()
  @IsOptional()
  life_modifier: string | null = null;

  @Expose()
  @IsOptional()
  loyalty: string | null = null;

  @Expose()
  @IsOptional()
  mana_cost: string | null = null;

  @Expose()
  @IsDefined()
  name: string;

  @Expose()
  @IsOptional()
  oracle_text: string | null = null;

  @Expose()
  @IsOptional()
  penny_rank: number | null = null;

  @Expose()
  @IsOptional()
  power: string | null = null;

  @Expose()
  @IsOptional()
  produced_mana: string | null = null;

  @Expose()
  @IsDefined()
  reserved: boolean;

  @Expose()
  @IsOptional()
  toughness: string | null = null;

  @Expose()
  @IsDefined()
  type_line: string;

  //Print Fields
  @Expose()
  @IsOptional()
  artist: string | null = null;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  artist_ids: string[] | null = null;

  @Expose()
  @IsOptional()
  attraction_lights: string | null = null;

  @Expose()
  @IsDefined()
  booster: boolean;

  @Expose()
  @IsDefined()
  border_color: string;

  @Expose()
  @IsDefined()
  card_back_id: string;

  @Expose()
  @IsDefined()
  collector_number: string;

  @Expose()
  @IsOptional()
  content_warning: boolean | null = null;

  @Expose()
  @IsDefined()
  digital: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  finishes: string[] | null = null;

  @Expose()
  @IsOptional()
  flavor_name: string | null = null;

  @Expose()
  @IsOptional()
  flavor_text: string | null = null;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  frame_effects: string[] | null = null;

  @Expose()
  @IsDefined()
  frame: string;

  @Expose()
  @IsDefined()
  full_art: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  games: string[] | null = null;

  @Expose()
  @IsDefined()
  highres_image: boolean;

  @Expose()
  @IsOptional()
  illustration_id: string | null = null;

  @Expose()
  @IsDefined()
  image_status: string;

  @Expose()
  @IsOptional()
  image_uris: object | null = null;

  @Expose()
  @IsDefined()
  oversized: boolean;

  @Expose()
  @IsDefined()
  prices: object;

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
  @IsDefined()
  promo: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  promo_types: string[] | null = null;

  @Expose()
  @IsOptional()
  purchase_uris: object | null = null;

  @Expose()
  @IsDefined()
  rarity: string;

  @Expose()
  @IsDefined()
  related_uris: object;

  @Expose()
  @IsDefined()
  released_at: Date;

  @Expose()
  @IsDefined()
  reprint: boolean;

  @Expose()
  @IsDefined()
  scryfall_set_uri: string;

  @Expose()
  @IsDefined()
  set_name: string;

  @Expose()
  @IsDefined()
  set_search_uri: string;

  @Expose()
  @IsDefined()
  set_type: string;

  @Expose()
  @IsDefined()
  set_uri: string;

  @Expose({ name: 'set' })
  set_code: string;

  @Expose()
  @IsDefined()
  set_id: string;

  @Expose()
  @IsDefined()
  story_spotlight: boolean;

  @Expose()
  @IsDefined()
  textless: boolean;

  @Expose()
  @IsDefined()
  variation: boolean;

  @Expose()
  @IsOptional()
  variation_of: string | null = null;

  @Expose()
  @IsOptional()
  security_stamp: string | null = null;

  @Expose()
  @IsOptional()
  watermark: string | null = null;

  /** 
  @Column(DataType.DATE)
  @Field({ nullable: true })
  'preview.previewed_at': Date | null = null;

  
  @Field({ nullable: true })
  'preview.source_uri': string | null = null;

  
  @Field({ nullable: true })
  'preview.source': string | null = null;
  */
}
