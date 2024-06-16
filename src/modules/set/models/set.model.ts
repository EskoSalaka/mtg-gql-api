import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Column, DataType, DefaultScope, HasMany, Model, Table } from 'sequelize-typescript';
import { Card } from 'src/modules/card/models/card.model';
import SetType from '../types/set-type.type';

export interface SetAttributes {
  id: string;
  object: string;
  code: string;
  mtgo_code: string | null;
  arena_code: string | null;
  tcgplayer_id: number | null;
  name: string;
  set_type: string;
  released_at: Date;
  block_code: string | null;
  block: string | null;
  parent_set_code: string | null;
  card_count: number;
  printed_size: number | null;
  digital: boolean;
  foil_only: boolean;
  nonfoil_only: boolean;
  scryfall_uri: string;
  uri: string;
  icon_svg_uri: string;
  search_uri: string;
}

export interface SetCreationAttributes extends SetAttributes {}

export const setUpdateFields: Array<keyof SetCreationAttributes> = [
  'card_count',
  'digital',
  'foil_only',
  'nonfoil_only',
  'scryfall_uri',
  'uri',
  'icon_svg_uri',
  'search_uri',
];

@DefaultScope(() => ({
  attributes: ['id'],
}))
@Table({ tableName: 'Sets', underscored: true, timestamps: true })
@ObjectType()
export class Set extends Model<SetAttributes, SetCreationAttributes> {
  //Core Set Fields
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  @Field(() => UUIDResolver)
  id: string;

  @Column(DataType.STRING)
  @Field()
  object: string;

  @Column(DataType.STRING)
  @Field(() => String)
  code: string;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  mtgo_code: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  arena_code: string | null;

  @Column(DataType.STRING)
  @Field(() => Int, { nullable: true })
  tcgplayer_id: number | null;

  @Column(DataType.STRING)
  @Field()
  name: string;

  @Column(DataType.STRING)
  @Field(() => SetType)
  set_type: string;

  @Column(DataType.DATE)
  @Field()
  released_at: Date;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  block_code: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  block: string | null;

  @Column(DataType.STRING)
  @Field(() => String, { nullable: true })
  parent_set_code: string | null;

  @Column(DataType.STRING)
  @Field()
  card_count: number;

  @Column(DataType.INTEGER)
  @Field(() => Int, { nullable: true })
  printed_size: number | null;

  @Column(DataType.BOOLEAN)
  @Field()
  digital: boolean;

  @Column(DataType.BOOLEAN)
  @Field()
  foil_only: boolean;

  @Column(DataType.BOOLEAN)
  @Field()
  nonfoil_only: boolean;

  @Column(DataType.STRING)
  @Field()
  scryfall_uri: string;

  @Column(DataType.STRING)
  @Field()
  uri: string;

  @Column(DataType.STRING)
  @Field()
  icon_svg_uri: string;

  @Column(DataType.STRING)
  @Field()
  search_uri: string;

  @HasMany(() => Card)
  cards: Card[];
}
