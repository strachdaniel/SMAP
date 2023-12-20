import SecondaryButton from '@/components/UI/Buttons/SecondaryButton';
import NumberSign from '@/global/UI/navigation/InfoGraphics/NumberSign';
import Link from 'next/link';
import MenuButton from '@/components/UI/Buttons/MenuButton';

const TopBar = (props: any) => {
  const sampleData = {
    stats: {
      sick_days: "-",
      vacation_left: "-",
      vacation_taken: "-",
      work_plan_left: "-",
      work_plan_done: "-",
    },
  };

  return (
    <div className="flex justify-between gap-2 mb-5">
      <NumberSign
        height={80}
        width={140}
        number={sampleData.stats.work_plan_done}
        title="Odpracované hodiny"
      />
      <NumberSign
        height={80}
        width={140}
        number={sampleData.stats.work_plan_left}
        title="Zbylý pracovní fond"
      />
      <NumberSign
        height={80}
        width={140}
        number={sampleData.stats.vacation_left}
        title="Zbylá dovolená"
      />
      <NumberSign
        height={80}
        width={140}
        number={sampleData.stats.vacation_taken}
        title="Čerpaná dovolená"
      />
      <NumberSign height={80} width={140} number={sampleData.stats.sick_days} title="Nemocenská" />
      <div className="flex-1" />
      <div className="flex flex-shrink-0">
        <div className="flex flex-col justify-center items-center gap-1 mr-1">
          <MenuButton onClick={() => null}><p className='text-[14px]'>VYTISKNOUT DOCHÁZKA</p></MenuButton>
          <MenuButton onClick={() => null}><p className='text-[14px]'>ZOBRAZIT VYPLATNICI</p></MenuButton>
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <Link href={`/dochazka/detail/edit/${props.id}`}>
            <MenuButton onClick={() => null}><p className='text-[14px]'>EDITOVAT DOCHÁZKU</p></MenuButton>
          </Link>
          <MenuButton onClick={() => null}><p className='text-[14px]'>ODEVZDAT DOCHAZKU</p></MenuButton>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
