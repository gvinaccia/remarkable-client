import { RawContentData } from '../shared';
import { ItemRepository } from './ItemRepository';

const { parse } = require('lines-parser');
const download = require('download');
const fs = require('fs');
const path = require('path');
const unzip = require('unzipper');

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

  private models: { Item?: any; } = {};

  constructor(private basePath: string) { }

  async sync(items: RawStorageItem[]): Promise<void> {
    const repo = new ItemRepository(path.join(this.basePath, 'db.sqlite'));

    await repo.init();

    const syncItem = async (item: RawStorageItem) => {
      const [ dbItem, created ] = await repo.findOrCreate(item.ID);

      if (created || item.Version !== parseInt(dbItem.version, 10)) {
        return download(item.BlobURLGet, this.basePath)
          .then(() => repo.updateVersion(item.ID, item.Version))
          .then(() => console.log('FETCHED ' + item.ID));
      }

      console.log('SKIPPED ' + item.ID);
      return Promise.resolve();
    };

    return Promise.all(
      items.map(syncItem)
    ).then(() => console.log('Storage in Sync'), console.error);
  }

  getItem(itemId: string) {

    return new Promise((resolve, reject) => {
      // trova file del doc
      const filename = path.join(this.basePath, `${itemId}.zip`);
      const outputPath = path.join(this.basePath, itemId);

      if (!fs.existsSync(filename)) {
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

          if (!fs.existsSync(linesFilePath)) {
            resolve(parsed);
            return;
          }

          const pagesPath = path.join(outputPath, 'pages');
          if (!fs.existsSync(pagesPath)) {
            fs.mkdirSync(pagesPath);
          }

          // parse lines file
          parse(linesFilePath, pagesPath)
            .then((paths: { path: string }[]) => resolve({ ...parsed, pages: paths }));
        });
    });
  }
}
