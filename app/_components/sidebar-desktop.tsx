'use client';

import dynamic from 'next/dynamic';

import { useMediaQuery } from 'usehooks-ts';

import SidebarItemsWrapper from './sidebar-items-wrapper';

const SidebarItems = dynamic(() => import('./sidebar-items'), {
  ssr: false,
  loading: () => <SidebarItemsWrapper />,
});

export default function SidebarDesktop() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (!isDesktop) return null;

  return <SidebarItems />;
}
