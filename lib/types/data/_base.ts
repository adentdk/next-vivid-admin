export interface BaseDataType {
  id: string;
  createTime: string;
  updateTime: string;
}

export interface MediaObjectType {
  id: string;
  path: string;
  publicUrl: string | null;
}
