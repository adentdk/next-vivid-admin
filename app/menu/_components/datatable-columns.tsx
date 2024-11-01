'use client';

import Link from 'next/link';

import { Menu } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { ButtonLink } from '~/components/ui/button-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { MenuGroupMap } from '~/libs/const/menu';
import { MenuGroupEnum } from '~/libs/types/enum';

export const columns: ColumnDef<Menu>[] = [
  {
    size: 4,
    accessorKey: 'id',
    header: 'ID',
  },
  {
    size: 4,
    accessorKey: 'name',
    header: 'Nama',
  },
  {
    size: 4,
    accessorKey: 'group',
    header: 'Group',
    cell({ row }) {
      return MenuGroupMap[row.getValue('group') as MenuGroupEnum];
    },
  },
  {
    size: 2,
    accessorKey: '_count.children',
    header: 'Jumlah sub menu',
    cell: ({ row }) => {
      return (
        <ButtonLink href={`/engine/menu?parentMenuId=${row.original.id}`}>
          {(row.original as any)?._count?.children ?? 0}
        </ButtonLink>
      );
    },
  },
  {
    size: 4,
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return row.getValue('status') ? 'Aktif' : 'Tidak Aktif';
    },
  },
  {
    size: 2,
    id: 'actions',
    cell: ({ row }) => {
      const menu = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={`/engine/menu/${menu.id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={`/engine/menu/${menu.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
