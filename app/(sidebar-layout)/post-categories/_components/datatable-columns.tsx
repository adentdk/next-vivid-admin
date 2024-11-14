"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostCategoryType } from "@/lib/types";

export const columns: ColumnDef<PostCategoryType>[] = [
  {
    size: 4,
    accessorKey: "id",
    header: "ID",
  },
  {
    size: 4,
    accessorKey: "name",
    header: "Name",
  },
  {
    size: 2,
    accessorKey: "_childrenCount",
    header: "Children Count",
    cell: ({ row }) => {
      return (
        <ButtonLink
          href={`/post-categories?parentCategoryId=${row.original.id}`}
        >
          {row.original._childrenCount ?? 0}
        </ButtonLink>
      );
    },
  },
  {
    size: 2,
    id: "actions",
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
              <Link href={`/post-categories/${menu.id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={`/post-categories/${menu.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
