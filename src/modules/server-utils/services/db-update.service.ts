import { Injectable, Logger } from '@nestjs/common';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { CardFace, cardFaceUpdateFields } from 'src/modules/card/models/card-face.model';
import { Card, cardUpdateFields } from 'src/modules/card/models/card.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { validate } from 'class-validator';
import { ScryfallDataDTO } from '../DTO/scryfall-data.dto';
import { Set, setUpdateFields } from 'src/modules/set/models/set.model';
import * as _ from 'lodash';
import { LatestPrice, Price, priceUpdateFields } from 'src/modules/card/models/price.model';
import { Ruling } from 'src/modules/ruling/models/ruling.model';
import { Symbology } from 'src/modules/symbology/models/symbology.model';
import type { Transaction } from 'sequelize';
const fs = require('fs');

@Injectable()
export class DBUpdateService {
  private readonly logger = new Logger(DBUpdateService.name);

  constructor(
    private http: HttpService,
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(Set) private setModel: typeof Set,
    @InjectModel(CardFace) private cardFaceModel: typeof CardFace,
    @InjectModel(Ruling) private rulingModel: typeof Ruling,
    @InjectModel(Price) private priceModel: typeof Price,
    @InjectModel(LatestPrice) private latestPriceModel: typeof LatestPrice,
    @InjectModel(Symbology) private symbologyModel: typeof Symbology,
    private db: Sequelize,
  ) {}

  async updateDb(bulkDataType: IScryfallBulkData['type'] = 'default_cards') {
    this.logger.log('--------------------------------------------------------------');
    this.logger.log('Updating database');

    try {
      await this.db.transaction(async (tx) => {
        const bulkDataOptions = (
          await firstValueFrom(this.http.get('https://api.scryfall.com/bulk-data', {}))
        ).data.data as IScryfallBulkData[];

        let bulkData = bulkDataOptions.find((bdo) => bdo.type === bulkDataType);
        let bulkRulingsData = bulkDataOptions.find((bdo) => bdo.type === 'rulings');

        this.logger.log('Downloading set data from scryfall...');
        const setsJSONData = await (
          await firstValueFrom(this.http.get('https://api.scryfall.com/sets'))
        ).data.data;
        this.logger.log('Done downloading set data...');

        this.logger.log('Downloading bulk card data from scryfall...');
        let cardsJSONData = (await firstValueFrom(this.http.get(bulkData.download_uri, {}))).data;
        this.logger.log('Done downloading bulk card data...');

        this.logger.log('Downloading rulings data from scryfall...');
        let rulingsJSONData = (
          await firstValueFrom(this.http.get(bulkRulingsData.download_uri, {}))
        ).data;
        this.logger.log('Done downloading rulings data...');

        this.logger.log('Validating data...');
        let scryfallData = plainToInstance(
          ScryfallDataDTO,
          {
            cards: cardsJSONData,
            sets: setsJSONData,
            rulings: rulingsJSONData,
          },
          {
            excludeExtraneousValues: true,
            exposeUnsetFields: true,
            exposeDefaultValues: true,
          },
        );

        let errors = await validate(scryfallData, {
          skipMissingProperties: false,
          whitelist: true,
        });

        if (errors.length > 0) {
          throw errors;
        }

        this.logger.log('Done validating data...');

        this.logger.log('Inserting set data into database...');
        await this.setModel.bulkCreate(scryfallData.sets as any, {
          logging: false,
          transaction: tx,
          updateOnDuplicate: setUpdateFields,
        });
        this.logger.log('Done inserting set data...');

        this.logger.log('Inserting card data into database...');
        await this.cardModel.bulkCreate(scryfallData.cards as any, {
          logging: false,
          updateOnDuplicate: cardUpdateFields,
          transaction: tx,
        });

        let cardPrices = scryfallData.cards.map((c) => c.prices).flat();
        await this.priceModel.bulkCreate(cardPrices, {
          logging: false,
          transaction: tx,
        });
        await this.latestPriceModel.bulkCreate(cardPrices, {
          logging: false,
          updateOnDuplicate: priceUpdateFields,
          transaction: tx,
        });
        this.logger.log('Done inserting card data...');

        this.logger.log('Inserting card face data into database...');
        let cardFaces = scryfallData.cards.map((c) => c.card_faces).flat();

        await this.cardFaceModel.bulkCreate(cardFaces, {
          logging: false,
          updateOnDuplicate: cardFaceUpdateFields,
          transaction: tx,
        });
        this.logger.log('Done inserting card face data...');

        this.logger.log('Inserting ruling data into database...');
        await this.rulingModel.truncate({ logging: false, transaction: tx });
        await this.rulingModel.bulkCreate(scryfallData.rulings as any, {
          logging: false,
          transaction: tx,
        });
        this.logger.log('Done inserting ruling data...');

        await this.updateSymbology(tx);
      });
    } catch (error) {
      log(error);
      this.logger.error('Update Failed. Rolling back update...');
      this.logger.error(error);
    } finally {
      this.logger.log('Update complete');
      this.logger.log('--------------------------------------------------------------');
    }
  }

  async updateSymbology(transaction?: Transaction) {
    this.logger.log('Updating symbology data...');

    try {
      await this.db.transaction({ transaction }, async (tx) => {
        this.logger.log('Downloading symbology data from scryfall...');
        let symbologyJSONData = (
          await firstValueFrom(this.http.get('https://api.scryfall.com/symbology ', {}))
        ).data.data;
        this.logger.log('Done downloading symbology data...');

        let scryfallData = plainToInstance(
          ScryfallDataDTO,
          {
            symbology: symbologyJSONData,
          },
          {
            excludeExtraneousValues: true,
            exposeUnsetFields: true,
            exposeDefaultValues: true,
          },
        );
        let errors = await validate(scryfallData, {
          skipMissingProperties: false,
          whitelist: true,
        });

        if (errors.length > 0) {
          throw errors;
        }

        this.logger.log('Inserting symbology data into database...');
        await this.symbologyModel.truncate({ logging: false, transaction: tx });
        await this.symbologyModel.bulkCreate(scryfallData.symbology, {
          logging: false,
          transaction: tx,
        });
        this.logger.log('Done inserting symbology data...');
      });
    } catch (error) {
      log(error);
      this.logger.error('Update Failed. Rolling back update...');
      this.logger.error(error);
      throw error;
    }
  }
}

export interface IScryfallBulkData {
  id: string;
  uri: string;
  type: string;
  name: string;
  description: string;
  download_uri: string;
  updated_at: string;
  size: number;
  content_type: string;
  content_encoding: string;
}
