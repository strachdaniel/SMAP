import LibraryLayout from '@/components/Layouts/LibraryLayout';

export default function Notifications() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Tato sekce se stale pripravuje...</p>
    </div>
  );
}

Notifications.getLayout = function getLayout(page: any) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
