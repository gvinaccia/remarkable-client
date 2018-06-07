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

export interface RawContentData {
  extraMetadata: { };
  fileType: ''|'pdf';
  fontName: string;
  lastOpenedPage: number;
  lineHeight: number;
  margins: number;
  pageCount: number;
  textScale: number;

  // transformation matrix
  transform: {
    m11: 0|1;
    m12: 0|1;
    m13: 0|1;
    m21: 0|1;
    m22: 0|1;
    m23: 0|1;
    m31: 0|1;
    m32: 0|1;
    m33: 0|1;
  };
}

export interface Notebook extends StorageItem {
  pages?: { path: string; }[];
  content?: RawContentData;
}
