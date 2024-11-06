import { BaseDataType } from "./_base";

export interface PostCategoryType extends BaseDataType {
  name: string | null;
  _childrenCount?: number;
}
