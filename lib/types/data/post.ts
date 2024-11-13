import { PostStatusEnum } from "../enum";

import { BaseDataType } from "./_base";

export interface PostManageType extends BaseDataType {
  publishTime: string;
  title: string;
  status: PostStatusEnum;
  authorId: string;
  approvedBy: string;
  locale: string;
}
