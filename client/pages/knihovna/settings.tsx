import LibraryLayout from '@/components/Layouts/LibraryLayout';

export default function Settings() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Tato sekce se stale pripravuje...</p>
    </div>
  );
}

Settings.getLayout = (page: any) => <LibraryLayout>{page}</LibraryLayout>;
