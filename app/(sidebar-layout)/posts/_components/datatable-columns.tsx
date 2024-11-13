"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
    header: "Title",
    cell: ({ row: { original: post } }) => {
      return post.title || <i>No title</i>;
    },
  },
  {
    size: 4,
    accessorKey: "locale",
    header: "Locale",
    cell: ({ row: { original: post } }) => {
      return post.locale;
    },
  },
  {
    size: 2,
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: post } }) => {
      return (
        <Badge variant={post.status === "published" ? "default" : "secondary"}>
          {post.status}
        </Badge>
      );
    },
  },
  {
    size: 4,
    accessorKey: "publishTime",
    header: "Publish Time",
    cell: ({ row: { original: post } }) => {
      return post.publishTime || "-";
    },
  },
  {
    size: 2,
    id: "actions",
    cell: ({ row: { original: post } }) => {
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
              <Link href={`/posts/${post.id}/update`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="hover:cursor-pointer">
              <Link href={`/posts/${post.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
