import LibraryLayout from "@/components/Layouts/LibraryLayout";

export default function Templates() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Tato sekce se stale pripravuje...</p>
    </div>
  );
}

Templates.getLayout = function getLayout(page: any) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
