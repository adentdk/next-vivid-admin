'use server';

import { revalidatePath } from 'next/cache';

import { mkdir, readdir, rm, rmdir, stat, writeFile } from 'fs/promises';
import { join } from 'path';

import { FolderItem } from '~/libs/types/file-manager';

const getPath = (...path: string[]) => join(process.cwd(), 'public', ...path);

export async function getFolderItems(
  path: string,
  allowedExtensions?: string[],
): Promise<FolderItem[]> {
  let folderItems = await readdir(getPath(path), {
    withFileTypes: true,
  });

  if (allowedExtensions && allowedExtensions.length > 0) {
    folderItems = folderItems.filter((item) => {
      if (item.isDirectory()) return true;
      const ext = item.name.split('.').pop() ?? '.xxx';
      return allowedExtensions.includes(ext);
    });
  }

  return folderItems
    .map((item) => {
      const basePath = join(path, item.name);
      return {
        name: item.name,
        path: basePath.startsWith('/') ? basePath : `/${basePath}`,
        isFolder: item.isDirectory(),
      };
    })
    .sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });
}

export async function getPathInfo(path: string) {
  const stats = await stat(getPath(path));
  return {
    isFolder: stats.isDirectory(),
    name: path.split('/').pop(),
    path,
    size: stats.size,
    lastModified: stats.mtimeMs,
  };
}

export async function createFolder(path: string) {
  await mkdir(getPath(path));
  revalidatePath('/engine/file-manager', 'layout');

  return true;
}

export async function saveFile(path: string, formData: FormData) {
  const file = formData.get('file') as File;
  const buffer = await file.arrayBuffer();
  await writeFile(getPath(path, file.name), new Uint8Array(buffer));

  revalidatePath('/engine/file-manager', 'layout');

  return true;
}

export async function removeFile(path: string) {
  await rm(getPath(path));
  revalidatePath('/engine/file-manager', 'layout');

  return true;
}

export async function removeFolder(path: string) {
  await rmdir(getPath(path));
  revalidatePath('/engine/file-manager', 'layout');

  return true;
}
