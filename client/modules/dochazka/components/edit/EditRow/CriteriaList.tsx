import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
  activeCriteria: any[];
  removeFromActiveCriteria: (index: number, dayliCriteria: any) => any;
};

const CriteriaList = (props: Props) => {
  return (
    <div className="col-start-4 col-span-2 col-end-5">
      {props.activeCriteria.map((criteria: any, index: number) => {
        return (
          <CriteriaRow
            criteria={criteria}
            key={index}
            index={index}
            removeFromActiveCriteria={props.removeFromActiveCriteria}
          ></CriteriaRow>
        );
      })}
    </div>
  );
};

const CriteriaRow = (props: any) => {
  const [serverCriteria, setServerCriteria] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`${process.env.ATTENDANCE_URL}/criteria/${props.criteria.criteria_id}`)
      .then((res) => {
        setServerCriteria(res.data);
      })
      .catch((err) => {
        console.log('criteria error', err);
      });
  }, []);

  return (
    <div key={props.index} className="grid grid-cols-[1fr_50px_50px_50px]">
      <p>{serverCriteria?.name}</p>
      {(() => {
        if (serverCriteria?.type === 'hour-rate') {
          return (
            <div className="flex items-center">
              <p>{props.criteria.hours} h</p>
            </div>
          );
        } else {
          return <div>{props.criteria.note}</div>;
        }
      })()}
      <button onClick={(e) => props.removeFromActiveCriteria(props.index, props.criteria)}>
        Smazat
      </button>
    </div>
  );
};

export default CriteriaList;
