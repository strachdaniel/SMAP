import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/global/stores/userAtom';
import Dropdown from '../Generic/DropDown';
import Cookies from 'js-cookie';

export default function UserBadge() {
  const [user, setUser]: any = useRecoilState(userAtom);

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('token');
  };

  const dropdownItems = [{ label: 'Odhlásit se', onClick: () => handleLogout() }];
  return (
    <div className="flex justify-center items-center h-full">
      <Image
        className="rounded-full object-cover h-[40px] w-[40px] mr-4"
        width={40}
        height={40}
        src={user?.picture}
        alt="User avatar"
      />
      <span>{`${user.first_name} ${user.last_name}`}</span>
      <Dropdown label="" items={dropdownItems}></Dropdown>
    </div>
  );
}
