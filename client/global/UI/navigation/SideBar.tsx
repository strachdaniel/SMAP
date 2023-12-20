import SideBarIcon from './SideBar/SideBarIcon';
import MenuIcon from '../../../public/icons/menu.svg';
import GearIcon from '../../../public/icons/gear.svg';
import Link from 'next/link';
import Image from 'next/image';

interface SideBarProps {
  links: { path: string; label: string; icon: object }[];
  color: string;
}

const SideBar = ({ links, color }: SideBarProps) => {
  return (
    <div className={`w-[60px] bg-white h-screen absolute left-0 top-0 flex flex-col`}>
      <div
        className={`w-[60px] h-[60px] bg-${color} flex justify-center items-center`}
        style={{ backgroundColor: color }}
      >
        <Link href="/">
          <Image src={MenuIcon} alt="Knihovna" className="w-[20px] h-[20px] cursor-pointer" />
        </Link>
      </div>
      {links.map((link) => (
        <Link href={link.path} key={link.path}>
          <SideBarIcon src={link.icon} alt={link.label} path={link.path} />
        </Link>
      ))}
      <div className="flex-auto"></div>
      <Link href="/knihovna/settings">
        <SideBarIcon src={GearIcon} alt="Nastaveni" path="/knihovna/settings" />
      </Link>
    </div>
  );
};

export default SideBar;
