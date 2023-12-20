import LibraryLayout from '@/components/Layouts/LibraryLayout';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Image from 'next/image';
import AddIcon from '@/public/icons/add.svg';
import Modal from '@/components/Generic/Modal';
import { useState } from 'react';
import Borrow from '@/modules/knihovna/components/Borrow';

export default function Loans() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <PrimaryButton onClick={() => setIsModalOpen(true)}>
        <div className="flex justify-between w-72">
          <p>PŘIDAT NOVOU KNIHU</p>
          <Image src={AddIcon} height={20} width={20} alt="Přidat novou knihu" />
        </div>
      </PrimaryButton>
      <Modal
        disableClickOutside={true}
        size="lg"
        title="Pujcit knihy"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Borrow setModalIsOpen={setIsModalOpen}></Borrow>
      </Modal>
    </div>
  );
}

Loans.getLayout = function getLayout(page: React.ReactNode) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
