import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, DefaultScope, HasMany, Index, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Card } from 'src/modules/card/models/card.model';

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

@DefaultScope(() => ({
  attributes: ['id'],
}))
@Table({ tableName: 'Rulings', underscored: true, timestamps: true })
@ObjectType()
export class Ruling extends Model<RulingAttributes, RulingCreationAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  @Field(() => String)
  id: string;

  @Index
  @Column({
    type: DataType.UUID,
  })
  @Field(() => String)
  oracle_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Index
  @Field(() => String)
  source: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @Index
  @Field(() => Date)
  published_at: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Index
  @Field(() => String)
  comment: string;

  @HasMany(() => Card, {
    as: 'cards',
    constraints: false,
    sourceKey: 'oracle_id',
    foreignKey: 'oracle_id',
  })
  @Field(() => [Card], { nullable: true })
  cards: Card[] | null;
}
