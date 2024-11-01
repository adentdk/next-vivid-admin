import { boolean, InferType, mixed, number, object, string } from 'yup';

import {
  MenuGroupEnum,
  MenuLinkTargetEnum,
  MenuLinkTypeEnum,
} from '~/libs/types/enum';

export const createMenuSchema = object().shape({
  name: string().required('Nama menu harus diisi'),
  description: string().optional(),
  group: mixed<MenuGroupEnum>().required('Group harus dipilih'),
  sitemapPriority: number().required('Prioritas sitemap harus diisi'),
  linkType: mixed<MenuLinkTypeEnum>().required().default(MenuLinkTypeEnum.Href),
  href: string().when('linkType', {
    is: (val: MenuLinkTypeEnum) => val === MenuLinkTypeEnum.Href,
    then: (s) => s.required('Href harus diisi'),
    otherwise: (s) => s.optional(),
  }),
  categoryId: number().when('linkType', {
    is: (val: MenuLinkTypeEnum) => val === MenuLinkTypeEnum.Category,
    then: (s) => s.required('Kategori harus dipilih'),
    otherwise: (s) => s.optional(),
  }),
  linkTarget: mixed<MenuLinkTargetEnum>().required('Target harus dipilih'),
  status: boolean().required('Status harus dipilih'),
  i18nNameKey: string().optional(),
  i18nDescriptionKey: string().optional(),
  parentId: number().optional(),
  badge: object()
    .shape({
      text: string().optional(),
      color: string().optional(),
      icon: string().optional(),
    })
    .nullable(),
  icon: string().optional(),
});

export type CreateMenuSchemaType = InferType<typeof createMenuSchema>;
