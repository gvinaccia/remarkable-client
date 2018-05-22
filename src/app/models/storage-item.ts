export type StorageItemId = string;

export type DocumentType = 'DocumentType';
export type CollectionType = 'CollectionType';
export type StorageItemType = DocumentType | CollectionType;

export class RawStorageItem {
  ID: StorageItemId;
  Version: number;
  Message: string;
  Success: boolean;
  BlobURLGet: string;
  BlobURLGetExpires: string;
  ModifiedClient: string;
  Type: StorageItemType;
  VissibleName: string;
  CurrentPage: number;
  Bookmarked: boolean;
  Parent: StorageItemId;
}

export class StorageItem {
  id: StorageItemId;
  name: string;
  type: StorageItemType;
  currentPage: number;
  isBookmarked: boolean;
  parentId: StorageItemId;
}
