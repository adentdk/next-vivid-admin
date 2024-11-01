import MapFolderItems from './_components/map-folder-items';
import { getFolderItems } from './actions';

export default async function Page() {
  const folderItems = await getFolderItems('/');

  return (
    <>
      <MapFolderItems folderItems={folderItems} />
    </>
  );
}
