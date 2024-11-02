import { MenuGroupEnum, MenuLinkTargetEnum } from "../enum";

import { BaseDataType } from "./_base";

export interface MenuBadgeType {
  text: string;
  color: string | null;
}

export interface MenuType extends BaseDataType {
  name: string | null;
  description: string | null;
  group: MenuGroupEnum | null;
  linkTarget: MenuLinkTargetEnum | null;
  href: string | null;
  status: boolean;
  badge: MenuBadgeType | null;
  sitemapPriority: number;
  icon: string | null;
  sort: number | null;
  i18nNameKey: string | null;
  i18nDescriptionKey: string | null;
  postCategoryId: string | null;
  parentId: string | null;
  postCategory: null;
  parent: MenuType | null;
  children: MenuType[];
}
