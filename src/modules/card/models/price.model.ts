import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, DefaultScope, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { Card } from './card.model';
import { UUIDResolver } from 'graphql-scalars';

export interface PriceAttributes {
  id: string;
  card_id: string;
  usd: string;
  usd_foil: string;
  usd_etched: string;
  eur: string;
  eur_foil: string;
  eur_etched: string;
  tix: string;
  created_at: Date;
  updated_at: Date;
}

export interface PriceCreationAttributes extends Optional<PriceAttributes, 'id'> {}

export const priceUpdateFields: Array<keyof PriceAttributes> = [
  'usd',
  'usd_foil',
  'usd_etched',
  'eur',
  'eur_foil',
  'eur_etched',
  'tix',
  'updated_at',
];
@DefaultScope(() => ({
  attributes: ['id'],
}))
@Table({ tableName: 'Prices', underscored: true, timestamps: true })
@ObjectType()
export class Price extends Model<PriceAttributes, PriceCreationAttributes> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @Field()
  id: string;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @Field(() => UUIDResolver)
  card_id: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  usd: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  usd_foil: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  usd_etched: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  eur: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  eur_foil: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  eur_etched: string | null;

  @Column({
    type: DataType.DECIMAL,
    allowNull: true,
  })
  @Field(() => String, { nullable: true })
  tix: string | null;

  @Field(() => Date, { nullable: true })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_at: Date;
}

@Table({ tableName: 'LatestPrices', underscored: true, timestamps: true })
@ObjectType()
export class LatestPrice extends Price {
  @ForeignKey(() => Card)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  @Field(() => UUIDResolver)
  card_id: string;
}
