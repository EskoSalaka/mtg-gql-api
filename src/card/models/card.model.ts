import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
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

@Table({ tableName: 'card', underscored: true, timestamps: false })
@ObjectType()
export class Card extends Model<Card> {
  //Core Card Fields
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  @Field(() => UUIDResolver)
  id: string;

  @HasOne(() => Card, { foreignKey: 'id' })
  selfJoin: Card;

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

  @Column(DataType.JSON)
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

  @Column(DataType.UUIDV4)
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
  @Column(DataType.JSON)
  all_parts: any | null;

  @HasMany(() => CardFace)
  @Field(() => [CardFace], { nullable: true })
  card_faces: CardFace[] | null;

  @Column(DataType.DECIMAL)
  @Field()
  cmc: number;

  @Column(DataType.JSON)
  @Field(() => [Color])
  color_identity: Color[];

  @Column(DataType.JSON)
  @Field(() => [Color], { nullable: true })
  color_indicator: Color[] | null;

  @Column(DataType.JSON)
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

  @Column(DataType.JSON)
  @Field(() => [String])
  keywords: string[];

  @Column(DataType.JSON)
  @Field(() => JSONResolver, { nullable: true })
  legalities: object;

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

  @Column(DataType.STRING)
  @Field({ nullable: true })
  oracle_text: string | null;

  @Column(DataType.INTEGER)
  @Field({ nullable: true })
  penny_rank: number | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  power: string | null;

  @Column(DataType.JSON)
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
  type_line: string;

  //Print Fields
  @Column(DataType.STRING)
  @Field({ nullable: true })
  artist: string | null;

  @Column(DataType.JSON)
  @Field(() => [String], { nullable: true })
  artist_ids: string[] | null;

  @Column(DataType.JSON)
  @Field(() => [String], { nullable: true })
  attraction_lights: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  booster: boolean;

  @Column(DataType.STRING)
  @Field()
  border_color: string;

  @Column(DataType.UUIDV4)
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

  @Column(DataType.JSON)
  @Field(() => [String], { nullable: true })
  finishes: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  flavor_name: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  flavor_text: string | null;

  @Column(DataType.JSON)
  @Field((type) => [FrameEffect], { nullable: true })
  frame_effects: string[] | null;

  @Column(DataType.STRING)
  @Field(() => Frame)
  frame: string;

  @Column(DataType.BOOLEAN)
  @Field()
  full_art: boolean;

  @Column(DataType.JSON)
  @Field(() => [String], { nullable: true })
  games: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  highres_image: boolean;

  @Column(DataType.UUIDV4)
  @Field({ nullable: true })
  illustration_id: string | null;

  @Column(DataType.STRING)
  @Field()
  image_status: string;

  @Column(DataType.JSON)
  @Field(() => CardImagery, { nullable: true })
  image_uris: object | null;

  @Column(DataType.BOOLEAN)
  @Field()
  oversized: boolean;

  @Column(DataType.JSON)
  @Field(() => JSONResolver)
  prices: object;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_name: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_text: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_type_line: string | null;

  @Column(DataType.BOOLEAN)
  @Field()
  promo: boolean;

  @Column(DataType.JSON)
  @Field(() => [String], { nullable: true })
  promo_types: string[] | null;

  @Column(DataType.JSON)
  @Field(() => JSONResolver, { nullable: true })
  purchase_uris: object | null;

  @Column(DataType.STRING)
  @Field()
  rarity: string;

  @Column(DataType.JSON)
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
    type: DataType.UUIDV4,
    field: 'set',
  })
  @Field()
  set_code: string;

  @Column(DataType.UUIDV4)
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

  @Column(DataType.UUIDV4)
  @Field({ nullable: true })
  variation_of: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  security_stamp: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  watermark: string | null;

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
