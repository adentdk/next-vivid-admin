import {
  MenuGroupEnum,
  MenuLinkTargetEnum,
  MenuLinkTypeEnum,
} from "@/lib/types/enum";

export const MenuGroupMap: Record<MenuGroupEnum, string> = {
  [MenuGroupEnum.Default]: "Default",
  [MenuGroupEnum.Top]: "Top",
  [MenuGroupEnum.Bottom]: "Bottom",
};

export const MenuLinkTypeMap: Record<MenuLinkTypeEnum, string> = {
  [MenuLinkTypeEnum.Href]: "Href",
  [MenuLinkTypeEnum.Category]: "Category",
};

export const MenuLinkTargetMap: Record<MenuLinkTargetEnum, string> = {
  [MenuLinkTargetEnum.CurrentTab]: "Current Tab",
  [MenuLinkTargetEnum.Blank]: "Blank",
};
