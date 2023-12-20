import Head from 'next/head';
import Layout from '../../components/Layouts/LibraryLayout';

export default function Readers() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p>Tato sekce se stale pripravuje...</p>
    </div>
  );
}

Readers.getLayout = (page: any) => <Layout>{page}</Layout>;
