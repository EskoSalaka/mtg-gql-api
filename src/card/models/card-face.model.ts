import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { Card } from './card.model';
import { UUIDResolver } from 'graphql-scalars';
import Color from '../types/color.type';
import { CardImagery } from '../types/card-imagery.type';
import Layout from '../types/layout.type';

@Table({ tableName: 'card_face', underscored: true, timestamps: false })
@ObjectType()
export class CardFace extends Model<CardFace> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  @Field()
  @Index
  id: number;

  @ForeignKey(() => Card)
  @Column(DataType.UUIDV4)
  @Field(() => UUIDResolver)
  @Index
  card_id: string;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  artist: string | null;

  @Column(DataType.STRING)
  @Field(() => UUIDResolver, { nullable: true })
  artist_id: string | null;

  @Column(DataType.DECIMAL)
  @Field({ nullable: true })
  cmc: number | null;

  @Column(DataType.JSON)
  @Field(() => [Color], { nullable: true })
  color_indicator: Color[] | null;

  @Column(DataType.JSON)
  @Field(() => [Color], { nullable: true })
  colors: Color[] | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  defense: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  flavor_text: string | null;

  @Column(DataType.UUIDV4)
  @Field({ nullable: true })
  illustration_id: string | null;

  @Column(DataType.JSON)
  @Field(() => CardImagery, { nullable: true })
  image_uris: object | null;

  @Column(DataType.STRING)
  @Field(() => Layout, { nullable: true })
  layout: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
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

  @Column(DataType.UUIDV4)
  @Field({ nullable: true })
  oracle_id: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  oracle_text: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  power: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_name: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_text: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  printed_type_line: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  toughness: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  type_line: string | null;

  @Column(DataType.STRING)
  @Field({ nullable: true })
  watermark: string | null;
}
