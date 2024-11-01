import FileManagerHeader from './_components/file-manager-header';
import ModalDelete from './_components/modal-delete';
import { FileManagerStoreProvider } from './_components/store-provider';

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <FileManagerStoreProvider>
      <main className="flex flex-col flex-1 h-full space-y-8">
        <FileManagerHeader />
        <div className="flex flex-col flex-1">{children}</div>
      </main>

      <ModalDelete />
    </FileManagerStoreProvider>
  );
}
