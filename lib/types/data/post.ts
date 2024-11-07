import { PostStatusEnum } from "../enum";

import { BaseDataType } from "./_base";

export interface PostManageType extends BaseDataType {
  title: string;
  statuses: {
    locale: string;
    status: PostStatusEnum;
  }[];
}
