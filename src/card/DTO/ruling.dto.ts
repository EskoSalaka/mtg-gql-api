import { Expose, Transform, Type } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class RulingDTO {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsUUID()
  oracle_id: string;

  @Expose()
  @IsString()
  source: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  published_at: Date;

  @Expose()
  @IsString()
  comment: string;
}
