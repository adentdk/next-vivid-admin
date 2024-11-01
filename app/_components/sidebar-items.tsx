import {
  AppWindow,
  BookCopy,
  Cog,
  Contact,
  File,
  Languages,
  LayoutDashboard,
  Newspaper,
  Users,
} from 'lucide-react';

import LogoRectangle from '~/components/icons/logo-rectangle';
import { Separator } from '~/components/ui/separator';

import { SidebarItem } from './sidebar-item';
import SidebarItemsWrapper from './sidebar-items-wrapper';

export default function SidebarItems(props: { className?: string }) {
  const { className } = props;
  return (
    <SidebarItemsWrapper className={className}>
      <LogoRectangle className="mx-auto my-4 h-10 px-4 w-auto" />
      <SidebarItem
        links={[
          {
            title: 'Dashboard',
            icon: LayoutDashboard,
            variant: 'ghost',
            href: '/engine',
          },
          {
            title: 'Menu',
            icon: AppWindow,
            variant: 'ghost',
            href: '/engine/menu',
          },
          {
            title: 'Article',
            icon: Newspaper,
            variant: 'ghost',
            href: '/engine/article',
          },
          {
            title: 'Banner',
            icon: BookCopy,
            variant: 'ghost',
            href: '/engine/banner',
          },
          {
            title: 'Contact',
            icon: Contact,
            variant: 'ghost',
            href: '/engine/contact',
          },
          {
            title: 'User',
            icon: Users,
            variant: 'ghost',
            href: '/engine/user',
          },
          {
            title: 'Setting',
            icon: Cog,
            variant: 'ghost',
            href: '/engine/setting',
          },
          {
            title: 'Translation Manager',
            icon: Languages,
            variant: 'ghost',
            href: '/engine/translation-manager',
          },
        ]}
      />
      <Separator />
      <SidebarItem
        links={[
          {
            title: 'File Manager',
            icon: File,
            variant: 'ghost',
            href: '/engine/file-manager',
          },
        ]}
      />
    </SidebarItemsWrapper>
  );
}
