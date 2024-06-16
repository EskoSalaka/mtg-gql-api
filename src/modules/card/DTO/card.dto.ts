import Language from '../types/language.type';
import { CardFaceDTO } from './card-face.dto';
import Color from '../types/color.type';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PriceDto } from './price.dto';
import * as _ from 'lodash';

export class CardDTO {
  /**
   * When creating a new CardFace, we need to create a unique id for it based on the related card_id so
   * that it is always the same for the same card face. We can do this simply by using the card_id and
   * appending a number to it. This way we can always identify the card face and update it in the database
   * when we get new data from the scryfall API. Its not a UUID but its fine for our purposes.
   *
   * We cant use a simple auto-incrementing id for the CardFace because we cant ensure the order of the data
   * coming from the scryfall API. We need to be able to uniquely identify each card face so that we can
   * update the data in the database when we get new data from the scryfall API.
   */
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardFaceDTO)
  @Transform(({ value, obj }) =>
    value.map((v, i) => {
      v.card_id = obj.id;
      v.id = `${obj.id}-${i}`;

      return v;
    }),
  )
  card_faces: CardFaceDTO[] = [];

  @Expose()
  @IsDefined()
  @Type(() => PriceDto)
  @Transform(({ value, obj }) => ({ ...value, card_id: obj.id }))
  prices: PriceDto;

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
  @IsNumber()
  cardmarket_id: number | null = null;

  @Expose()
  @IsString()
  object: string;

  @Expose()
  @IsString()
  layout: string;

  @Expose()
  @IsOptional()
  @IsString()
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
  @IsUrl()
  uri: string;

  //Gameplay Fields
  @Expose()
  @IsOptional()
  @IsArray()
  all_parts: any | null = null;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  cmc: number | null = null;

  @Expose()
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
  @IsString()
  defense: string | null = null;

  @Expose()
  @IsOptional()
  edhrec_rank: number | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  hand_modifier: string | null = null;

  @Expose()
  @IsString({ each: true })
  keywords: string[];

  @Expose()
  @IsDefined()
  legalities: object;

  @Expose()
  @IsOptional()
  @IsString()
  life_modifier: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  loyalty: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  mana_cost: string | null = null;

  @Expose()
  @IsDefined()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  oracle_text: string | null = null;

  @Expose()
  @IsOptional()
  penny_rank: number | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  power: string | null = null;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  produced_mana: string[] | null = null;

  @Expose()
  @IsBoolean()
  reserved: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  toughness: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  type_line: string | null = null;

  //Print Fields
  @Expose()
  @IsOptional()
  @IsString()
  artist: string | null = null;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  artist_ids: string[] | null = null;

  @Expose()
  @IsOptional()
  @IsNumber({}, { each: true })
  attraction_lights: number[] | null = null;

  @Expose()
  @IsBoolean()
  booster: boolean;

  @Expose()
  @IsString()
  border_color: string;

  @Expose()
  @IsString()
  @IsOptional()
  card_back_id: string | null = null;

  @Expose()
  @IsString()
  collector_number: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  content_warning: boolean | null = null;

  @Expose()
  @IsBoolean()
  digital: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  finishes: string[] | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  flavor_name: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  flavor_text: string | null = null;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  frame_effects: string[] | null = null;

  @Expose()
  @IsString()
  frame: string;

  @Expose()
  @IsBoolean()
  full_art: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  games: string[] | null = null;

  @Expose()
  @IsBoolean()
  highres_image: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  illustration_id: string | null = null;

  @Expose()
  @IsDefined()
  image_status: string;

  @Expose()
  @IsOptional()
  image_uris: object | null = null;

  @Expose()
  @IsBoolean()
  oversized: boolean;

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
  @IsBoolean()
  promo: boolean;

  @Expose()
  @IsOptional()
  @IsString({ each: true })
  promo_types: string[] | null = null;

  @Expose()
  @IsOptional()
  purchase_uris: object | null = null;

  @Expose()
  @IsString()
  rarity: string;

  @Expose()
  @IsDefined()
  related_uris: object;

  @Expose()
  @IsDateString()
  released_at: Date;

  @Expose()
  @IsBoolean()
  reprint: boolean;

  @Expose()
  @IsString()
  scryfall_set_uri: string;

  @Expose()
  @IsString()
  set_name: string;

  @Expose()
  @IsString()
  set_search_uri: string;

  @Expose()
  @IsString()
  set_type: string;

  @Expose()
  @IsString()
  set_uri: string;

  @Expose({ name: 'set' })
  @IsString()
  set_code: string;

  @Expose()
  @IsString()
  set_id: string;

  @Expose()
  @IsBoolean()
  story_spotlight: boolean;

  @Expose()
  @IsBoolean()
  textless: boolean;

  @Expose()
  @IsBoolean()
  variation: boolean;

  @Expose()
  @IsOptional()
  @IsString()
  variation_of: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  security_stamp: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
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

export class CardRulingDTO {
  @Expose()
  @IsString()
  card_id: string;

  @Expose()
  @IsUUID()
  oracle_id: string;
}
