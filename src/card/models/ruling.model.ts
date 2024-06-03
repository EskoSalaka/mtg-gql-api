import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, ForeignKey, Index, Model, Table } from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { Card } from './card.model';

export interface RulingAttributes {
  id: string;
  card_id: string;
  source: string;
  published_at: Date;
  comment: string;
}

export interface RulingCreationAttributes extends Optional<RulingAttributes, 'id'> {}

export const rulingUpdateFields: Array<keyof RulingAttributes> = [
  'source',
  'published_at',
  'comment',
];

@Table({ tableName: 'Rulings', underscored: true, timestamps: true })
@ObjectType()
export class Ruling extends Model<RulingAttributes, RulingCreationAttributes> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  @Field()
  id: string;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @Field()
  oracle_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Index
  @Field()
  source: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @Index
  @Field()
  published_at: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Index
  @Field()
  comment: string;
}
