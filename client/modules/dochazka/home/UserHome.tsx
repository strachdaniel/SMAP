import NumberSign from '@/global/UI/navigation/InfoGraphics/NumberSign';
import axios from 'axios';
import useSWR from 'swr';
import HomeStats from './HomeStats';
import GenericTable from '@/global/Tables/GenericTable';
import moment from 'moment';
import Link from 'next/link';
import Modal from '@/components/Generic/Modal';
import { useState } from 'react';
import MenuButton from '@/components/UI/Buttons/MenuButton';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';

const UserHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cols = [
    {
      name: 'Rok',
      mapping: (item: any) => moment(item.date).format('YYYY'),
    },
    {
      name: 'Měsíc',
      mapping: (item: any) => moment(item.date).format('MMMM'),
    },
  ];

  const actions = (item: any) => {
    return (
      <div className="flex gap-3 justify-end">
        <Link href={`/dochazka/detail/${item.attendance_id}`}>
          <MenuButton className="w-[100px]" onClick={() => null}>
            DETAIL
          </MenuButton>
        </Link>
        <Link href={`/dochazka/detail/edit/${item.attendance_id}`}>
          <MenuButton className="w-[100px]" onClick={() => null}>
            EDITOVAT
          </MenuButton>
        </Link>
      </div>
    );
  };

  const { data, error, isLoading }: any = useSWR(`${process.env.ATTENDANCE_URL}/attendance`, axios);

  return (
    <>
      <div>
        <div className="flex-1 flex flex-row items-center">
          <HomeStats />
          <PrimaryButton onClick={() => setIsOpen(true)} className="h-[50px] w-[300px]">
            <p className="text-[14px] text-center">NASTAVENÍ ŠABLONY</p>
          </PrimaryButton>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            title="NASTAVENÍ AUTOMATICKÉHO VYPLŇOVÁNÍ DOCHÁZKY"
          >
            <div>KOMPONENTA PRO DOPLNOVANI DOCHAZKY</div>
          </Modal>
        </div>
        <div>
          <button>Nastaveni sablon</button>
        </div>
        <div className="bg-white rounded-md shadow-md p-10">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <GenericTable
              actions={actions}
              data={data.data}
              cols={cols}
              id="attendance_id"
            ></GenericTable>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHome;
