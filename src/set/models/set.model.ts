import { Field, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Card } from 'src/card/models/card.model';
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

@Table({ tableName: 'Sets', underscored: true, timestamps: false })
@ObjectType()
export class Set extends Model<SetAttributes, SetCreationAttributes> {
  //Core Set Fields
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  @Field(() => UUIDResolver)
  id: string;

  @Column
  @Field()
  object: string;

  @Column
  @Field()
  code: string;

  @Column
  @Field({ nullable: true })
  mtgo_code: string | null;

  @Column
  @Field({ nullable: true })
  arena_code: string | null;

  @Column
  @Field({ nullable: true })
  tcgplayer_id: number | null;

  @Column
  @Field()
  name: string;

  @Column
  @Field(() => SetType)
  set_type: string;

  @Column
  @Field()
  released_at: Date;

  @Column
  @Field({ nullable: true })
  block_code: string | null;

  @Column
  @Field({ nullable: true })
  block: string | null;

  @Column
  @Field({ nullable: true })
  parent_set_code: string | null;

  @Column
  @Field()
  card_count: number;

  @Column
  @Field({ nullable: true })
  printed_size: number | null;

  @Column
  @Field()
  digital: boolean;

  @Column
  @Field()
  foil_only: boolean;

  @Column
  @Field()
  nonfoil_only: boolean;

  @Column
  @Field()
  scryfall_uri: string;

  @Column
  @Field()
  uri: string;

  @Column
  @Field()
  icon_svg_uri: string;

  @Column
  @Field()
  search_uri: string;

  @HasMany(() => Card)
  @Field(() => [Card])
  cards: Card[];
}
