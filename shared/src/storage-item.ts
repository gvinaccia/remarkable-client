export type StorageItemId = string;

export type DocumentType = 'DocumentType';
export type CollectionType = 'CollectionType';
export type StorageItemType = DocumentType | CollectionType;

export interface RawStorageItem {
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

export interface StorageItem {
  id: StorageItemId;
  name: string;
  type: StorageItemType;
  currentPage: number;
  isBookmarked: boolean;
  parentId: StorageItemId;
}

export interface Notebook extends StorageItem {
  pages?: { path: string; }[];
}
