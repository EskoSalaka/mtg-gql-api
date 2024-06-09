import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PriceDto {
  @IsString()
  card_id: string;

  @Expose()
  @IsOptional()
  @IsString()
  usd: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  usd_foil: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  usd_etched: string | null = null;

  @Expose()
  @IsOptional()
  eur: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  eur_foil: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  eur_etched: string | null = null;

  @Expose()
  @IsOptional()
  @IsString()
  tix: string | null = null;
}
