import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Card } from './card.model';
import { UUIDResolver } from 'graphql-scalars';
import Color from '../types/color.type';
import { CardImagery } from '../types/card-imagery.type';
import Layout from '../types/layout.type';
import { Optional } from 'sequelize';

export interface CardFaceAttributes {
  id: string;
  artist: string | null;
  artist_id: string | null;
  cmc: number | null;
  color_indicator: Color[] | null;
  colors: Color[] | null;
  defense: string | null;
  flavor_text: string | null;
  illustration_id: string | null;
  image_uris: object | null;
  layout: string | null;
  loyalty: string | null;
  mana_cost: string;
  name: string;
  object: string;
  oracle_id: string | null;
  oracle_text: string | null;
  power: string | null;
  printed_name: string | null;
  printed_text: string | null;
  printed_type_line: string | null;
  toughness: string | null;
  type_line: string | null;
  watermark: string | null;
}

export interface CardFaceCreationAttributes extends Optional<CardFaceAttributes, 'id'> {}

export const cardFaceUpdateFields: Array<keyof CardFaceCreationAttributes> = [
  'flavor_text',
  'image_uris',
  'oracle_text',
  'printed_text',
];

@Table({ tableName: 'CardFaces', underscored: true, timestamps: true })
@ObjectType()
export class CardFace extends Model<CardFaceAttributes, CardFaceCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  @Field()
  @Index
  id: string;

  @ForeignKey(() => Card)
  @PrimaryKey
  @Column(DataType.UUID)
  @Field(() => UUIDResolver)
  @Index
  card_id: string;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  artist: string | null;

  @Column(DataType.STRING)
  @Field(() => UUIDResolver, { nullable: true })
  artist_id: string | null;

  @Column(DataType.DECIMAL)
  @Field(() => Int, { nullable: true })
  cmc: number | null;

  @Column(DataType.JSONB)
  @Field(() => [Color], { nullable: true })
  color_indicator: Color[] | null;

  @Column(DataType.JSONB)
  @Field(() => [Color], { nullable: true })
  colors: Color[] | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  defense: string | null;

  @Column(DataType.TEXT('long'))
  @Field(() => String, { nullable: true })
  flavor_text: string | null;

  @Column(DataType.UUID)
  @Field(() => String, { nullable: true })
  illustration_id: string | null;

  @Column(DataType.JSONB)
  @Field(() => CardImagery, { nullable: true })
  image_uris: object | null;

  @Column(DataType.STRING)
  @Field(() => Layout, { nullable: true })
  layout: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  loyalty: string | null;

  @Column(DataType.STRING)
  @Field()
  @Index
  mana_cost: string;

  @Column(DataType.STRING)
  @Field()
  @Index
  name: string;

  @Column(DataType.STRING)
  @Field()
  object: string;

  @Column(DataType.UUID)
  @Field(() => String, { nullable: true })
  oracle_id: string | null;

  @Column(DataType.TEXT('long'))
  @Field(() => String, { nullable: true })
  oracle_text: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  power: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  printed_name: string | null;

  @Column(DataType.TEXT('long'))
  @Field(() => String, { nullable: true })
  printed_text: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  printed_type_line: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  toughness: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  type_line: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  watermark: string | null;
}
