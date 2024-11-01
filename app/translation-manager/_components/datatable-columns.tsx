'use client';

import Link from 'next/link';

import { I18nTranslation } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { ButtonLink } from '~/components/ui/button-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export const columns: ColumnDef<Pick<I18nTranslation, 'namespace'>>[] = [
  {
    size: 4,
    accessorKey: 'namespace',
    header: 'Namespace',
    cell: ({ row }) => (
      <ButtonLink
        href={`/engine/translation-manager/${row.original.namespace}`}
      >
        {row.original.namespace}
      </ButtonLink>
    ),
  },
  {
    size: 2,
    id: 'actions',
    cell: ({ row }) => {
      const translation = row.original;
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
              <Link
                href={`/engine/translation-manager/${translation.namespace}/edit`}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link
                href={`/engine/translation-manager/${translation.namespace}/delete`}
              >
                Delete
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
