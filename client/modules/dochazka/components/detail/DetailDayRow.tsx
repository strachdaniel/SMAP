import moment from 'moment';
import 'moment/locale/cs';
interface DetailDayRowProps {
  data: {
    date: string;
    from: string;
    to: string;
    note: string;
    criteria?: any;
  };
}

const DetailDayRow = (props: DetailDayRowProps) => {
  return (
    <div className="flex-col">
      <div className="grid grid-cols-[repeat(3,150px)_1fr]">
        <p>{moment(props.data.date).format('DD/MM - ddd')}</p>
        <p>{moment(props.data.from).format('HH:mm')}</p>
        <p>{moment(props.data.to).format('HH:mm')}</p>
        <p>{props.data.note}</p>
      </div>
      <div className="grid grid-cols-[repeat(3,150px)_1fr_1fr]">
        <div className="col-span-3"></div>
        {props.data.criteria?.map((item: any) => (
          <p>{item.criteria.name}</p>
        ))}
      </div>
    </div>
  );
};

export default DetailDayRow;
