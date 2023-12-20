import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import LibraryLayout from '../../components/Layouts/LibraryLayout';
import Image from 'next/image';
import AddIcon from '../../public/icons/add.svg';
import TableComp from '../../components/Generic/TableComp';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Modal from '@/components/Generic/Modal';
import { Fascinate } from 'next/font/google';
import AddBook from '@/modules/knihovna/components/AddBook';
import ManageCategories from '@/modules/knihovna/components/ManageCategories';
import SecondaryButton from '@/components/UI/Buttons/SecondaryButton';

const columns = [
  { header: 'ISBN', key: 'isbn' },
  { header: 'NÁZEV', key: 'title' },
  { header: 'AUTOR', key: 'author' },
  { header: 'KATEGORIE', key: 'author' },
  { header: 'PODKATEGORIE', key: 'author' },
];

export default function Knihovna() {
  const [books, setBooks] = useState<any>([]);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 11;

  const { data, error, isValidating } = useSWR<any>(
    `http://localhost:3002/api/library/books`,
    axios
  );

  useEffect(() => {
    if (data) {
      setBooks(data.data);
    }
  }, [data]);

  return (
    <div className="h-full p-[25px]">
      <Modal
        disableClickOutside={true}
        size="lg"
        title="Pridat novou knihu"
        isOpen={isBookModalOpen}
        onClose={() => setBookModalOpen(false)}
      >
        <AddBook />
      </Modal>
      <Modal
        disableClickOutside={true}
        size="lg"
        title="Správa kategorií"
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      >
        <ManageCategories />
      </Modal>

      <div className="flex justify-between mb-4">
        <PrimaryButton
          onClick={() => {
            console.log('click');

            setBookModalOpen(true);
          }}
        >
          <div className="flex justify-between w-72">
            <p>PŘIDAT NOVOU KNIHU</p>
            <Image src={AddIcon} height={20} width={20} alt="Přidat novou knihu" />
          </div>
        </PrimaryButton>
        <SecondaryButton
          onClick={() => {
            console.log('click');

            setCategoryModalOpen(true);
          }}
        >
          <div className="flex justify-between w-72">
            <p>SPRAVOVAT KATEGORIE</p>
            <Image src={AddIcon} height={20} width={20} alt="Spravovat kategorie" />
          </div>
        </SecondaryButton>
      </div>
      {isValidating ? (
        <p>Loading...</p>
      ) : (
        <TableComp
          data={books}
          //@ts-ignore
          columns={columns}
          pageSize={PAGE_SIZE}
          onChangePage={setCurrentPage}
          currentPage={currentPage}
        ></TableComp>
      )}
    </div>
  );
}

Knihovna.getLayout = function getLayout(page: React.ReactNode) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
