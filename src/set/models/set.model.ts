import { Field, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Card } from 'src/card/models/card.model';
import SetType from '../types/set-type.type';

@Table({ tableName: 'set', underscored: true, timestamps: false })
@ObjectType()
export class Set extends Model<Set> {
  //Core Set Fields
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
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
