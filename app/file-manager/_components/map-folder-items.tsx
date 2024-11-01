'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { File, Folder } from 'lucide-react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '~/components/ui/context-menu';
import MapItems from '~/components/utils/map-items';
import { FolderItem } from '~/libs/types/file-manager';
import { cn } from '~/libs/utils/classnames';

export default function MapFolderItems(props: {
  folderItems: FolderItem[];
  layout?: 'grid' | 'list';
}) {
  const { folderItems } = props;

  const router = useRouter();

  const handleFolderItemClick = useCallback(
    (folderItem: FolderItem) => (event: React.MouseEvent) => {
      event.preventDefault();
      if (folderItem.isFolder) {
        router.push(`/engine/file-manager${folderItem.path}`);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="flex flex-wrap gap-4">
      <MapItems items={folderItems} emptyMessage="No items found">
        {(folderItem, index) => {
          const isImage =
            folderItem.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) !== null;
          return (
            <ContextMenu key={folderItem.path}>
              <ContextMenuTrigger
                className={cn(
                  'flex flex-col items-center px-4 py-2 rounded-md',
                  'w-32',
                  'hover:bg-card',
                )}
                asChild
              >
                <Link
                  href={`/engine/file-manager${folderItem.path}`}
                  onClick={handleFolderItemClick(folderItem)}
                >
                  {folderItem.isFolder ? (
                    <Folder className="w-24 h-24 fill-primary" />
                  ) : isImage ? (
                    <Image
                      src={`${folderItem.path}`}
                      alt={folderItem.name}
                      width={48}
                      height={48}
                      className="object-contain w-full h-24"
                    />
                  ) : (
                    <File className="w-24 h-24" />
                  )}

                  <span className="text-sm text-center">{folderItem.name}</span>
                </Link>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem inset asChild>
                  <Link href={`?path=${folderItem.path}&action=rename`}>
                    Rename
                  </Link>
                </ContextMenuItem>
                <ContextMenuItem inset asChild>
                  <Link href={`?path=${folderItem.path}&action=delete`}>
                    Delete
                  </Link>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        }}
      </MapItems>
    </div>
  );
}
