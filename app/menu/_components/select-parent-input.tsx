'use client';

import { forwardRef, useMemo } from 'react';

import { SelectMap, SelectMapItem } from '~/components/ui/select';
import withFormItemWrapper from '~/components/utils/with-form-item-wrapper';
import { MenuWithChildren } from '~/libs/prisma/types/extends';

import { useGetAllMenusRecursive } from '../_hooks/use-all-menus';

const SelectParentInput = forwardRef<
  HTMLSelectElement,
  Omit<React.ComponentPropsWithoutRef<typeof SelectMap>, 'items'>
>((props, ref) => {
  const menus = useGetAllMenusRecursive({
    options: {
      revalidateOnMount: true,
    },
  });

  const items = useMemo<SelectMapItem[]>(() => {
    if (!menus.data) return [];

    const mapMenuToSelectItem = (menu: MenuWithChildren): SelectMapItem => {
      if (menu.children && menu.children.length > 0) {
        return {
          value: menu.id.toString(),
          label: menu.name,
          items: menu.children.map(mapMenuToSelectItem),
        };
      } else {
        return {
          value: menu.id.toString(),
          label: menu.name,
        };
      }
    };

    const mappedItems: SelectMapItem[] = menus.data.map(mapMenuToSelectItem);
    mappedItems.unshift({ value: 'null', label: 'No Parent' });
    return mappedItems;
  }, [menus.data]);

  return <SelectMap items={items} {...props} />;
});

SelectParentInput.displayName = 'SelectParentInput';

const FormSelectParentInput = withFormItemWrapper(SelectParentInput);

export { FormSelectParentInput, SelectParentInput };
