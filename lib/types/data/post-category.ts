import { BaseDataType } from "./_base";

export interface PostCategoryType extends BaseDataType {
  name: string;
  parentId?: string;
  _childrenCount?: number;
}

export interface PostCategoryTypeWithChildren extends PostCategoryType {
  children: PostCategoryType[];
}
