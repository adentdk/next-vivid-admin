"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostManageType } from "@/lib/types";

export const columns: ColumnDef<PostManageType>[] = [
  {
    size: 4,
    accessorKey: "_id",
    header: "ID",
  },
  {
    size: 4,
    accessorKey: "title",
    header: "title",
    cell: ({ row }) => {
      return row.original.title || <i>No title</i>;
    },
  },
  {
    size: 2,
    accessorKey: "statuses",
    header: "Status",
    cell: ({ row }) => {
      return (
        row.original.statuses
          ?.map((status) => `${status.locale}: ${status.status}`)
          .join(", ") ?? "-"
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
              <Link href={`/posts/${menu._id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={`/posts/${menu._id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
