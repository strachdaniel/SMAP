import SideBarIcon from './SideBarIcon';
import LibraryIcon from '../../../public/icons/books-light.svg';
import RenewIcon from '../../../public/icons/renew.svg';
import UserIcon from '../../../public/icons/user.svg';
import TemplateIcon from '../../../public/icons/template.svg';
import GearIcon from '../../../public/icons/gear.svg';
import BellIcon from '../../../public/icons/bell.svg';
import MenuIcon from '../../../public/icons/menu.svg';

import Link from 'next/link';
import Image from 'next/image';
const SideBar = () => {
  return (
    <div className="w-[60px] bg-white h-screen absolute left-0 top-0 flex flex-col">
      <div className="w-[60px] h-[60px] bg-primary flex justify-center items-center">
        <Link href="/">
          <Image src={MenuIcon} alt="Knihovna" className="w-[25px] h-[25px] cursor-pointer" />
        </Link>
      </div>
      <Link href="/knihovna">
        <SideBarIcon src={LibraryIcon} alt="Knihovna" path="/knihovna" />
      </Link>
      <Link href="/knihovna/loans">
        <SideBarIcon src={RenewIcon} alt="Výpůjčky" path="/knihovna/loans" />
      </Link>
      <Link href="/knihovna/readers">
        <SideBarIcon src={UserIcon} alt="Ctenari" path="/knihovna/readers" />
      </Link>
      <Link href="/knihovna/templates">
        <SideBarIcon src={TemplateIcon} alt="Sablony" path="/knihovna/templates" />
      </Link>
      <Link href="/knihovna/notifications">
        <SideBarIcon src={BellIcon} alt="Notifikace" path="/knihovna/notifications" />
      </Link>
      <div className="flex-auto"></div>
      <Link href="/knihovna/settings">
        <SideBarIcon src={GearIcon} alt="Nastaveni" path="/knihovna/settings" />
      </Link>
    </div>
  );
};

export default SideBar;
