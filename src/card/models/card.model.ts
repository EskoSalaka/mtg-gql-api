import { Column, DataType, ForeignKey, HasMany, Index, Model, Table } from 'sequelize-typescript';
import Color from '../types/color.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { JSONResolver, URLResolver, UUIDResolver } from 'graphql-scalars';
import Language from '../types/language.type';
import { CardImagery } from '../types/card-imagery.type';
import { CardFace } from './card-face.model';
import { Set } from 'src/set/models/set.model';
import Layout from '../types/layout.type';
import Frame from '../types/frame.type';
import FrameEffect from '../types/frame-effect.type';
import { Legalities } from '../types/legalities.type';
import { Prices } from '../types/prices.type';
import { RelatedCardInfo } from '../types/related-object.type';
import { Ruling } from './ruling.model';

export interface CardAttributes {
  //Core Card Fields
  id: string;
  lang: Language;
  arena_id: number | null;
  mtgo_id: number | null;
  mtgo_foil_id: number | null;
  multiverse_ids: number[] | null;
  tcgplayer_id: number | null;
  tcgplayer_etched_id: number | null;
  cardmarket_id: number | null;
  object: string;
  layout: string;
  oracle_id: string | null;
  prints_search_uri: string;
  rulings_uri: string;
  scryfall_uri: string;
  uri: string;

  //Gameplay Fields
  all_parts: any | null;
  cmc: number | null;
  color_identity: Color[];
  color_indicator: Color[] | null;
  colors: Color[] | null;
  defense: string | null;
  edhrec_rank: number | null;
  hand_modifier: string | null;
  keywords: string[];
  legalities: Legalities;
  life_modifier: string | null;
  loyalty: string | null;
  mana_cost: string | null;
  name: string;
  oracle_text: string | null;
  penny_rank: number | null;
  power: string | null;
  produced_mana: Color[] | null;
  reserved: boolean;
  toughness: string | null;
  type_line: string | null;

  //Print Fields
  artist: string | null;
  artist_ids: string[] | null;
  attraction_lights: string | null;
  booster: boolean;
  border_color: string;
  card_back_id: string;
  collector_number: string;
  content_warning: boolean | null;
  digital: boolean;
  finishes: string | null;
  flavor_name: string | null;
  flavor_text: string | null;
  frame_effects: string[] | null;
  frame: string;
  full_art: boolean;
  games: string | null;
  highres_image: boolean;
  illustration_id: string | null;
  image_status: string;
  image_uris: CardImagery | null;
  oversized: boolean;
  prices: Prices;
  printed_name: string | null;
  printed_text: string | null;
  printed_type_line: string | null;
  promo: boolean;
  promo_types: string[] | null;
  purchase_uris: object | null;
  rarity: string;
  related_uris: object;
  released_at: Date;
  reprint: boolean;
  scryfall_set_uri: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  set_code: string;
  set_id: string;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of: string | null;
  security_stamp: string | null;
  watermark: string | null;
}

export interface CardCreationAttributes extends CardAttributes {}

export const cardUpdateFields: Array<keyof CardCreationAttributes> = [
  'prints_search_uri',
  'rulings_uri',
  'scryfall_uri',
  'uri',
  'all_parts',
  'edhrec_rank',
  'legalities',
  'oracle_text',
  'flavor_text',
  'full_art',
  'games',
  'highres_image',
  'image_status',
  'image_uris',
  'prices',
  'printed_text',
  'purchase_uris',
  'scryfall_set_uri',
  'set_search_uri',
];

@Table({ tableName: 'Cards', timestamps: true })
@ObjectType()
export class Card extends Model<CardAttributes, CardCreationAttributes> {
  //Core Card Fields
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  @Field(() => UUIDResolver)
  id: string;

  @Index
  @Column(DataType.STRING)
  @Field(() => Language, { nullable: true })
  lang: Language;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  arena_id: number | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  mtgo_id: number | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  mtgo_foil_id: number | null;

  @Column(DataType.JSONB)
  @Field(() => [Number], { nullable: true })
  multiverse_ids: number[] | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  tcgplayer_id: number | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  tcgplayer_etched_id: number | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  cardmarket_id: number | null;

  @Column(DataType.STRING)
  @Field()
  object: string;

  @Column(DataType.STRING)
  @Field(() => Layout)
  layout: string;

  @Column(DataType.UUID)
  @Field({ nullable: true })
  oracle_id: string | null;

  @Column(DataType.STRING)
  @Field(() => URLResolver, { nullable: true })
  prints_search_uri: string;

  @Column(DataType.STRING)
  @Field(() => URLResolver, { nullable: true })
  rulings_uri: string;

  @Column(DataType.STRING)
  @Field(() => URLResolver)
  scryfall_uri: string;

  @Column(DataType.STRING)
  @Field(() => URLResolver)
  uri: string;

  //Gameplay Fields
  @Column(DataType.JSONB)
  @Field(() => [RelatedCardInfo], { nullable: true })
  all_parts: RelatedCardInfo[] | null;

  @HasMany(() => CardFace)
  @Field(() => [CardFace], { nullable: true })
  card_faces: CardFace[] | null;

  @Column(DataType.DECIMAL)
  @Field({ nullable: true })
  cmc: number | null;

  @Column(DataType.JSONB)
  @Field(() => [Color])
  color_identity: Color[];

  @Column(DataType.JSONB)
  @Field(() => [Color], { nullable: true })
  color_indicator: Color[] | null;

  @Column(DataType.JSONB)
  @Index
  @Field(() => [Color], { nullable: true })
  colors: Color[] | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  defense: string | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  edhrec_rank: number | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  hand_modifier: string | null;

  @Column(DataType.JSONB)
  @Field(() => [String])
  keywords: string[];

  @Column(DataType.JSONB)
  @Field(() => Legalities, { nullable: true })
  legalities: Legalities;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  life_modifier: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  loyalty: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  mana_cost: string | null;

  @Column(DataType.STRING)
  @Index
  @Field()
  name: string;

  @Column(DataType.TEXT('long'))
  @Field({ nullable: true })
  oracle_text: string | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  penny_rank: number | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  power: string | null;

  @Column(DataType.JSONB)
  @Field(() => [Color], { nullable: true })
  produced_mana: Color[] | null;

  @Column(DataType.BOOLEAN)
  @Field()
  reserved: boolean;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  toughness: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  type_line: string | null;

  //Print Fields
  @Column(DataType.STRING)
  @Field({ nullable: true })
  artist: string | null;

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  artist_ids: string[] | null;

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  attraction_lights: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  booster: boolean;

  @Column(DataType.STRING)
  @Field()
  border_color: string;

  @Column(DataType.UUID)
  @Field({ nullable: true })
  card_back_id: string;

  @Column(DataType.STRING)
  @Field()
  collector_number: string;

  @Column(DataType.BOOLEAN)
  @Field({ nullable: true })
  content_warning: boolean | null;

  @Column(DataType.BOOLEAN)
  @Field()
  digital: boolean;

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  finishes: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  flavor_name: string | null;

  @Column(DataType.TEXT('long'))
  @Field({ nullable: true })
  flavor_text: string | null;

  @Column(DataType.JSONB)
  @Field((type) => [FrameEffect], { nullable: true })
  frame_effects: string[] | null;

  @Column(DataType.STRING)
  @Field(() => Frame)
  frame: string;

  @Column(DataType.BOOLEAN)
  @Field()
  full_art: boolean;

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  games: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  highres_image: boolean;

  @Column(DataType.UUID)
  @Field({ nullable: true })
  illustration_id: string | null;

  @Column(DataType.STRING)
  @Field()
  image_status: string;

  @Column(DataType.JSONB)
  @Field(() => CardImagery, { nullable: true })
  image_uris: CardImagery | null;

  @Column(DataType.BOOLEAN)
  @Field()
  oversized: boolean;

  @Column(DataType.JSONB)
  @Field(() => Prices)
  prices: Prices;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_name: string | null;

  @Column(DataType.TEXT('long'))
  @Field({ nullable: true })
  printed_text: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_type_line: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  promo: boolean;

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  promo_types: string[] | null;

  @Column(DataType.JSONB)
  @Field(() => JSONResolver, { nullable: true })
  purchase_uris: object | null;

  @Column(DataType.STRING)
  @Field()
  rarity: string;

  @Column(DataType.JSONB)
  @Field(() => [URLResolver], { nullable: true })
  related_uris: object;

  @Column(DataType.DATE)
  @Field()
  released_at: Date;

  @Column(DataType.BOOLEAN)
  @Field()
  reprint: boolean;

  @Column(DataType.STRING)
  @Field(() => URLResolver)
  scryfall_set_uri: string;

  @Column(DataType.STRING)
  @Field()
  set_name: string;

  @Column(DataType.STRING)
  @Field(() => URLResolver)
  set_search_uri: string;

  @Column(DataType.STRING)
  @Field()
  set_type: string;

  @Column(DataType.STRING)
  set_uri: string;

  @Column({
    type: DataType.UUID,
    field: 'set',
  })
  @Field()
  set_code: string;

  @Column(DataType.UUID)
  @ForeignKey(() => Set)
  @Field(() => UUIDResolver)
  set_id: string;

  @Column(DataType.BOOLEAN)
  @Field()
  story_spotlight: boolean;

  @Column(DataType.BOOLEAN)
  @Field()
  textless: boolean;

  @Column(DataType.BOOLEAN)
  @Field()
  variation: boolean;

  @Column(DataType.UUID)
  @Field({ nullable: true })
  variation_of: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  security_stamp: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  watermark: string | null;

  @HasMany(() => Ruling, { sourceKey: 'oracle_id', foreignKey: 'oracle_id' })
  @Field(() => [Ruling], { nullable: true })
  rulings: Ruling[] | null;

  /** 
  @Column(DataType.DATE)
  @Field({ nullable: true })
  'preview.previewed_at': Date | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  'preview.source_uri': string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  'preview.source': string | null;
  */
}
