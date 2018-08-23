import { RawContentData } from '../shared';

const { parse } = require('lines-parser');
const download = require('download');
const fs = require('fs');
const path = require('path');
const unzip =  require('unzipper');
const Sequelize = require('sequelize');

interface RawStorageItem {
  ID: string;
  Version: number;
  Message: string;
  Success: boolean;
  BlobURLGet: string;
  BlobURLGetExpires: string;
  ModifiedClient: string;
  Type: 'CollectionType' | 'DocumentType';
  VissibleName: string;
  CurrentPage: number;
  Bookmarked: boolean;
  Parent: string;
}

export class Storage {

  private models: { Item?: any; } = { };

  constructor(private basePath: string) {
    const orm = new Sequelize('null', 'null', 'null', {
      dialect: 'sqlite',
      storage: path.join(this.basePath, 'db.sqlite'),
    });

    this.models.Item = orm.define('item', {
      id: {
        type: Sequelize.UUIDV4,
        primaryKey: true
      },
      version: {
        type: Sequelize.STRING
      }
    });

    orm.sync().then(() => {
      console.log('Schema created');
    });
  }

  async sync(items: RawStorageItem[]): Promise<void> {

    // const { Item } = this.models;
    //
    // const allItems = await Item.findAll();
    //
    // console.log(allItems, items);
    //
    return Promise.all(items.map(item => download(item.BlobURLGet, this.basePath)))
      .then(() => console.log('All Files Downloaded'), console.error);
  }

  getItem(itemId: string) {

    return new Promise((resolve, reject) => {
      // trova file del doc
      const filename = path.join(this.basePath, `${itemId}.zip`);
      const outputPath = path.join(this.basePath, itemId);

      if (! fs.existsSync(filename)) {
        return reject(`file ${filename} does not exist`);
      }

      // unzip doc
      fs.createReadStream(filename)
        .pipe(unzip.Extract({
          path: outputPath
        }))
        .on('finish', () => {
          const parsed: any = {
            pages: [],
          };
          const contentFilePath = path.join(outputPath, `${itemId}.content`);

          parsed.contentData = <RawContentData>JSON.parse(fs.readFileSync(contentFilePath, 'utf-8'));

          const linesFilePath = path.join(outputPath, `${itemId}.lines`);

          if (! fs.existsSync(linesFilePath)) {
            resolve(parsed);
            return;
          }

          const pagesPath = path.join(outputPath, 'pages');
          if (! fs.existsSync(pagesPath)) {
            fs.mkdirSync(pagesPath);
          }

          // parse lines file
          parse(linesFilePath, pagesPath)
            .then((paths: {path: string}[]) => resolve({ ...parsed, pages: paths }));
        });
    });
  }
}
