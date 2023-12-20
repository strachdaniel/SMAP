import React, { useEffect } from 'react';
import 'react-datetime/css/react-datetime.css';

import UserHome from '@/modules/dochazka/home/UserHome';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/global/stores/userAtom';
import useSWR from 'swr';
import fetcher from '@/global/fetcher';

function home() {
  const [user, setUser] = useRecoilState(userAtom);

  const { isLoading, data, error } = useSWR(
    `${process.env.ATTENDANCE_URL}/employee/my-info`,
    fetcher
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full">
      <UserHome />
    </div>
  );
}

export default home;
