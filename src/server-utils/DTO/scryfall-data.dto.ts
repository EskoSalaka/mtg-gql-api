import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CardDTO } from 'src/card/DTO/card.dto';
import { RulingDTO } from 'src/card/DTO/ruling.dto';
import { SetDTO } from 'src/set/DTO/set.dto';

export class ScryfallDataDTO {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardDTO)
  cards: CardDTO[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SetDTO)
  sets: SetDTO[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RulingDTO)
  rulings: RulingDTO[];
}
