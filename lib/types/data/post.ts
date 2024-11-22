import { PostStatusEnum } from "../enum";

import { BaseDataType, MediaObjectType } from "./_base";

export interface PostManageType extends BaseDataType {
  publishTime: string;
  title: string;
  seoTitle: string;
  seoDescription: string | null;
  status: PostStatusEnum;
  authorId: string;
  approvedBy: string;
  locale: string;
  tagIds: string[];
  keywords: string[];
  locationTag: string[];
  alternatePostIds: string[];
  mainImage: MediaObjectType | null;
  categoryIds: string[];
  content: string | null;
}
