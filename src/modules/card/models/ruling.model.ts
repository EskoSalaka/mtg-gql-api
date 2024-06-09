import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';

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
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Index
  @Column({
    type: DataType.UUID,
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
}
