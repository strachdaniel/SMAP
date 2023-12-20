import MenuButton from '@/components/UI/Buttons/MenuButton';
import SecondaryButton from '@/components/UI/Buttons/SecondaryButton';
import TextInput from '@/global/Inputs/TextInput';
import { useState } from 'react';
import { set } from 'react-hook-form';

const CriteriaChooser = (props: any) => {
  const [mode, setMode] = useState('choose');
  const [selectedCriteria, setSelectedCriteria] = useState<any>(null);

  const handleChooseCriteria = (criteria?: any) => {
    if (criteria) {
      setSelectedCriteria(criteria);
      if (criteria.type !== 'hour-rate') {
        passCriteria(criteria);
      } else setMode('edit');
    } else {
      setSelectedCriteria(null);
      setMode('choose');
    }
  };

  const passCriteria = (selectedCriteria: any) => {
    if (selectedCriteria) {
      props.handleActiveCriteriaChange(formatToDayliCriteria(selectedCriteria));
    }
    setMode('choose');
  };

  const formatToDayliCriteria = (criteria: any) => {
    return {
      dayli_criteria_id: criteria.dayli_criteria_id ? criteria.dayli_criteria_id : 0,
      day_id: props.day?.day_id,
      value: criteria.value ? criteria.value : null,
      note: criteria.note ? criteria.note : '',
      hours: criteria.hours ? criteria.hours : 0,
      criteria_id: criteria.criteria_id,
    };
  };

  return (
    <div>
      {mode === 'choose' ? (
        <div>
          <h2 className="text-lg font-bold">Vyber kritérium</h2>
          <div className="flex-col">
            {props.criteriaList.map((criteria: any) => (
              <div
                className="bg-white hover:bg-minor_button border-input_border border-[1px] flex justify-between items-center h-8 p-1 cursor-pointer my-2"
                onClick={() => handleChooseCriteria(criteria)}
              >
                <p>{criteria.name}</p>
                <p>{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-lg mb-3">Úprava kritéria - {selectedCriteria.name}</h2>
          {(() => {
            switch (selectedCriteria.type) {
              case 'hour-rate':
                return (
                  <TextInput
                    label="Pocet hodin"
                    name="hours"
                    type="number"
                    onChange={(e) =>
                      setSelectedCriteria({ ...selectedCriteria, hours: e.target.value })
                    }
                  />
                );
            }
          })()}
          <div className="flex justify-around mt-5 w-[600px] m-auto">
            <MenuButton onClick={() => handleChooseCriteria()}>Zpet</MenuButton>
            <MenuButton onClick={(e) => passCriteria(selectedCriteria)}>Potvrdit</MenuButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriteriaChooser;
