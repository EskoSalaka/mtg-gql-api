import { Expose, Type } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class RulingDTO {
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
