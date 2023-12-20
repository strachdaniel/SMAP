import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import GenericTable from '@/global/Tables/GenericTable';
import { useState } from 'react';
import NewEmployeeForm from '@/modules/dochazka/components/employees/NewEmployeeForm';
import Modal from '@/components/Generic/Modal';

const cols = [
  {
    name: 'JMÉNO',
    mapping: (item: any) => item.first_name,
  },
  {
    name: 'PŘÍJMENÍ',
    mapping: (item: any) => item.last_name,
  },
  {
    name: 'TYP',
    mapping: (item: any) => item.contracts[0].employment_type.name,
  },
  {
    name: 'ÚVAZEK',
    mapping: (item: any) => item.contracts[0].work_percentage,
  },
  {
    name: 'KATEGORIE',
    mapping: (item: any) => item.contracts[0].employee_category.name,
  },
];

function zamestnanci() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { data, error, isLoading }: any = useSWR(`${process.env.ATTENDANCE_URL}/employee`, axios);

  const actions = (item: any) => {
    return (
      <div className="flex gap-3">
        <button onClick={() => deleteEmployee(item.employee_id)}>SMAZAT</button>
        <button>EDITOVAT</button>
      </div>
    );
  };

  const deleteEmployee = (id: number) => {
    axios.delete(`${process.env.ATTENDANCE_URL}/employee/${id}`).then((res) => {
      const newEmployees = data.data.filter((item: any) => item.employee_id !== id);
      data.data = newEmployees;
    });
  };

  return (
    <div className="flex-col">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="FORMULAR PRO PRIDANI NOVEHO ZAMESTANCE"
      >
        <NewEmployeeForm />
      </Modal>
      <div className="mb-5">
        <PrimaryButton className="w-80" onClick={() => setIsOpen(true)}>
          PRIDAT ZAMESTNANCE
        </PrimaryButton>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <GenericTable data={data?.data} cols={cols} actions={actions} id="employee_id"></GenericTable>
      )}
    </div>
  );
}

export default zamestnanci;
