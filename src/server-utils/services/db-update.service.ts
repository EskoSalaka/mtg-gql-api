import { Injectable, Logger } from '@nestjs/common';
import { log } from 'console';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { CardDTO } from 'src/card/DTO/card.type';
import { CardFace } from 'src/card/models/card-face.model';
import { Card } from 'src/card/models/card.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { validate } from 'class-validator';
const fs = require('fs');

@Injectable()
export class DBUpdateService {
  private readonly logger = new Logger(DBUpdateService.name);

  constructor(
    private http: HttpService,
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(Set) private setModel: typeof Card,
    @InjectModel(CardFace) private cardFaceModel: typeof Card,
    private db: Sequelize,
  ) {}

  async updateDb(bulkDataType: IScryfallBulkData['type'] = 'default_cards') {
    this.logger.log('--------------------------------------------------------------');
    this.logger.log('Updating database');

    // application logic...
    try {
      await this.db.transaction(async (tx) => {
        this.logger.log('Truncating cards, card_faces and sets tables. Starting transaction...');
        await this.cardFaceModel.truncate({ transaction: tx });
        await this.cardModel.truncate({ transaction: tx });
        await this.setModel.truncate({ transaction: tx });
        this.logger.log('Done truncating tables...');

        this.logger.log('Downloading set data from scryfall...');
        const sets = await (
          await firstValueFrom(this.http.get('https://api.scryfall.com/sets'))
        ).data.data;

        this.logger.log('Inserting set data into database...');
        await this.setModel.bulkCreate(sets, { logging: false, transaction: tx });
        this.logger.log('Done inserting set data...');

        const bulkDataOptions = (
          await firstValueFrom(this.http.get('https://api.scryfall.com/bulk-data', {}))
        ).data.data as IScryfallBulkData[];

        let bulkData = bulkDataOptions.find((bdo) => bdo.type === bulkDataType);

        this.logger.log('Downloading card data from scryfall...');
        /*
        let defaultCardsJsonData = (await firstValueFrom(this.http.get(bulkData.download_uri, {})))
          .data;
          */
        let openedFile = await fs.promises.open('cards.json', 'r');

        this.logger.debug('Done downloading bulk card data...');
        let defaultCardsJsonData = JSON.parse(await openedFile.readFile('utf8'));
        this.logger.log('Done downloading bulk card data...');

        let dfo = plainToInstance(CardDTO, defaultCardsJsonData, {
          excludeExtraneousValues: true,
          exposeUnsetFields: true,
          exposeDefaultValues: true,
        }) as unknown as Card[];
        log(dfo[0]);

        let errors = await validate(dfo.slice(0, 10), {
          skipMissingProperties: false,
          whitelist: true,
        });

        if (errors.length > 0) {
          //log(errors);
          throw errors[0];
        }

        this.logger.log('Inserting card data into database...');
        await this.cardModel.bulkCreate(dfo, {
          logging: false,
          include: [{ model: CardFace, as: 'card_faces' }],
          transaction: tx,
        });
      });
    } catch (error) {
      console.log(error);
      this.logger.error('Update Failed. Rolling back update...');
      this.logger.error(error);
    } finally {
      this.logger.log('Update complete');
      this.logger.log('--------------------------------------------------------------');
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
