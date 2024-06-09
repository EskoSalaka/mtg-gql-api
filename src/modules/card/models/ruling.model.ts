import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { Card, CardRuling } from './card.model';

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
    type: DataType.UUID,
    primaryKey: true,
  })
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

  @BelongsToMany(() => Card, () => CardRuling, 'oracle_id', 'card_id')
  cards: Card[];
}
