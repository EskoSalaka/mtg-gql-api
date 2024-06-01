import { Args, ObjectType, OmitType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { WhereQueryArgs } from 'src/common/types/defaultQueryArgs.type';
import { plainToInstance } from 'class-transformer';
import { SelectedFields, SelectedFieldsResult } from 'nestjs-graphql-tools';
import { InjectModel } from '@nestjs/sequelize';
import { log } from 'console';
import { CardFace } from 'src/card/models/card-face.model';
import { Card } from 'src/card/models/card.model';
import { Set } from './models/set.model';

@Resolver(() => Set)
export class SetResolver {
  constructor(
    @InjectModel(Set)
    private setModel: typeof Set,
  ) {}

  @Query(() => [SetHeader])
  async set(@Args('id') id: string, @SelectedFields() selectedFields: SelectedFieldsResult) {
    let set = await this.setModel.findByPk(id, {
      attributes: selectedFields.fieldsData.fieldsString,
    });

    return plainToInstance(Set, set.toJSON());
  }

  @Query(() => [Set])
  async sets(
    @Args() query: WhereQueryArgs,
    @SelectedFields() selectedFields: SelectedFieldsResult,
  ) {
    let sets = await this.setModel.findAll({
      where: query.where,
      attributes: selectedFields.fieldsData.fieldsString,
    });

    return plainToInstance(
      Set,
      sets.map((set) => set.toJSON()),
    );
  }

  @ResolveField()
  async cards(@Parent() parent: Set, @SelectedFields() selectedFields: SelectedFieldsResult) {
    log(parent);
    log(selectedFields.fieldsData);
    let set = await this.setModel.findByPk(parent.id, {
      include: [
        {
          model: Card,
          attributes: selectedFields.fieldsData.fieldsString,
          include: [
            {
              model: CardFace,
            },
          ],
        },
      ],
    });

    return plainToInstance(
      Card,
      set.cards.map((card) => card.toJSON()),
    );
  }
}

@ObjectType()
export class SetHeader extends OmitType(Set, ['cards'] as const) {}
