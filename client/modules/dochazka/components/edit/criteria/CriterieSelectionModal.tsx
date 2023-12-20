import { useState, useEffect } from 'react';
import Modal from '@/components/Generic/Modal';
import useSWR from 'swr';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { attendanceAtom } from '@/global/stores/attendance/attendanceAtom';
import CriteriaChooser from './CriteriaChooser';

const CriteriaSelectionModal = ({ onClose, isOpen, setIsOpen, sheet, handleActiveCriteriaChange, day  }: any) => {
  const [criteriaList, setCriteriaList] = useState<string[]>([]);

  const { data, error, isLoading }: any = useSWR(
    `${process.env.ATTENDANCE_URL}/criteria/contract/${sheet.contract.contract_id}`,
    axios
  );

  useEffect(() => {
    if (data) {
      setCriteriaList(data.data);
    }
  }, [data]);

  return (
    <>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} title="VYBER KRITERIA">
        <CriteriaChooser criteriaList={criteriaList} handleActiveCriteriaChange={handleActiveCriteriaChange} day={day} />
      </Modal>
    </>
  );
};

export default CriteriaSelectionModal;
