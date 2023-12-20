import NumberSign from '@/global/UI/navigation/InfoGraphics/NumberSign';
import axios from 'axios';
import useSWR from 'swr';

interface HomeStatsProps {}

const HomeStats = (props: HomeStatsProps) => {
  // const {data, error, isLoading} = useSWR('/api/dochazka/home', axios)

  return (
    <div className="flex flex-row w-full justify-around gap-2 mb-5">
      <NumberSign title="Fond pracovné doby" number={'-'} height={80} width={140}></NumberSign>
      <NumberSign title="Odpracovaných hodin" number={'-'} height={80} width={140}></NumberSign>
      <NumberSign title="Dnů zbývající dovolené" number={'-'} height={80} width={140}></NumberSign>
      <NumberSign title="Dnů zbývající dovolené" number={'-'} height={80} width={140}></NumberSign>
    </div>
  );
};

export default HomeStats;
