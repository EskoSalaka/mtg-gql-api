import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CardDTO } from 'src/modules/card/DTO/card.dto';
import { RulingDTO } from 'src/modules/ruling/DTO/ruling.dto';
import { SetDTO } from 'src/modules/set/DTO/set.dto';
import { SymbologyDTO } from 'src/modules/symbology/DTO/symbology.dto';

export class ScryfallDataDTO {
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDTO)
  cards: CardDTO[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetDTO)
  sets: SetDTO[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RulingDTO)
  rulings: RulingDTO[];

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SymbologyDTO)
  symbology: SymbologyDTO[];
}
