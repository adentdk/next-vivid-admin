'use client';

import { Menu } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '~/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';

import SidebarItems from './sidebar-items';

export function MobileMenuButton() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isDesktop) return null;

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Menu size={24} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-min rounded-tl-none rounded-bl-none">
        <SidebarItems className="h-full" />
      </DrawerContent>
    </Drawer>
  );
}
