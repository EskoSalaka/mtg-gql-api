import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UUIDResolver } from 'graphql-scalars';
import { Column, DataType, DefaultScope, Model, Table } from 'sequelize-typescript';
import Color from 'src/modules/card/types/color.type';

export interface SymbologyAttributes {
  id: string;
  object: string;
  symbol: string;
  svg_uri: string;
  loose_variant: string | null;
  english: string;
  transposable: boolean;
  represents_mana: boolean;
  appears_in_mana_costs: boolean;
  mana_value: number;
  hybrid: boolean;
  phyrexian: boolean;
  cmc: number;
  funny: boolean;
  colors: Color[];
  gatherer_alternates: string[];
}

export interface SymbologyCreationAttributes extends SymbologyAttributes {}

@DefaultScope(() => ({
  attributes: ['id'],
}))
@Table({ tableName: 'Symbology', underscored: true, timestamps: true })
@ObjectType()
export class Symbology extends Model<SymbologyAttributes, SymbologyCreationAttributes> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @Field(() => UUIDResolver)
  id: string;

  @Column({
    type: DataType.STRING,
  })
  @Field(() => String)
  object: string;

  @Column({
    type: DataType.STRING,
  })
  @Field(() => String)
  symbol: string;

  @Column({
    type: DataType.STRING,
  })
  @Field(() => String)
  svg_uri: string;

  @Column({
    type: DataType.STRING,
  })
  @Field(() => String, { nullable: true })
  loose_variant: string | null;

  @Column({
    type: DataType.STRING,
  })
  @Field(() => String)
  english: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  transposable: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  represents_mana: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  appears_in_mana_costs: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  @Field(() => Int, { nullable: true })
  mana_value: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  hybrid: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  phyrexian: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  @Field(() => Int, { nullable: true })
  cmc: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  @Field(() => Boolean)
  funny: boolean;

  @Column(DataType.JSONB)
  @Field(() => [Color])
  colors: Color[];

  @Column(DataType.JSONB)
  @Field(() => [String], { nullable: true })
  gatherer_alternates: string[] | null;
}
