import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import GenericTable from '@/global/Tables/GenericTable';
import { useEffect, useState } from 'react';
import moment from 'moment';
import NewCriteriaForm from '@/modules/dochazka/components/criteria/CriteriaForm';
import Modal from '@/components/Generic/Modal';

function zamestnanci() {
  const cols = [
    {
      name: 'NÁZEV',
      mapping: (item: any) => item.name,
    },
    {
      name: 'PLATNOST OD',
      mapping: (item: any) => moment(item.valid_from).format('DD.MM.YYYY'),
    },
    {
      name: 'PLATNOST DO',
      mapping: (item: any) => moment(item.valid_to).format('DD.MM.YYYY'),
    },
    {
      name: 'TYP',
      mapping: (item: any) => {
        switch (item.type) {
          case 'hour-rate':
            return 'Hodinová sazba';
          case 'one_time':
            return 'Jednorázová odměna';
          case 'range':
            return 'Rozsah';
        }
      },
    },
    {
      name: 'ODMĚNA',
      mapping: (item: any) => {
        switch (item.type) {
          case 'hour-rate':
            return `${item.hour_rate} Kč/h`;
          case 'one_time':
            return `${item.value_once} Kč`;
          case 'range':
            return `${item.value_min} - ${item.value_max} Kč`;
        }
      },
    },
  ];

  const actions = (item: any) => {
    return (
      <div className="flex gap-3">
        <button onClick={() => deleteCriteria(item.criteria_id)}>SMAZAT</button>
        <button>EDITOVAT</button>
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const deleteCriteria = (id: number) => {
    axios.delete(`${process.env.ATTENDANCE_URL}/criteria/${id}`).then((res) => {
      alert('Kritérium bylo smazáno');
      const newCriteria = criteria.filter((item) => item.criteria_id !== id);
      setCriteria(newCriteria);
    });
  };

  const router = useRouter();
  const { data, error, isLoading }: any = useSWR(`${process.env.ATTENDANCE_URL}/criteria`, axios);
  const [criteria, setCriteria] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCriteria(data.data);
    }
  }, [data]);

  return (
    <div className="flex-col">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="FORMULÁŘ PRO PŘIDANÍ NOVÉHO KRITÉRIA"
      >
        <NewCriteriaForm />
      </Modal>
      <div className="mb-5">
        <PrimaryButton className="w-80" onClick={() => setIsOpen(true)}>
          PRIDAT KRITÉRIUM
        </PrimaryButton>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <GenericTable data={criteria} cols={cols} id="employee_id" actions={actions}></GenericTable>
      )}
    </div>
  );
}

export default zamestnanci;
