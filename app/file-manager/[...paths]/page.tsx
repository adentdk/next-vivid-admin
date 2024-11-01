import MapFolderItems from '../_components/map-folder-items';
import { getFolderItems } from '../actions';

export default async function Page(props: {
  params: {
    paths: string[];
  };
}) {
  const path = props.params.paths.join('/');
  const folderItems = await getFolderItems(path);
  return (
    <>
      <MapFolderItems folderItems={folderItems} />
    </>
  );
}
