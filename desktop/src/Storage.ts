const download = require('download');

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

  constructor(private basePath: string) { }

  sync(items: RawStorageItem[]): Promise<void> {
    return Promise.all(items.map(item => download(item.BlobURLGet, this.basePath)))
      .then(() => console.log('All Files Downloaded'), console.error);
  }

}
