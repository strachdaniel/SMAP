import { ReactNode } from 'react';
import SideBar from './SideBar';
import TopBar from './SideBar/TopBar';
import { useRouter } from 'next/router';
import TemplateIcon from '../../../public/icons/template.svg';
import UsersIcon from '../../../public/icons/users.svg';
import CriteriaIcon from '../../../public/icons/criteria.svg';

type LayoutProps = {
  children: ReactNode;
};

const NavigationLayout = ({ children }: LayoutProps) => {
  const dochazkaLinks = [
    { path: '/dochazka', label: 'Docházka', icon: TemplateIcon },
    { path: '/dochazka/admin/zamestnanci', label: 'Zamestnanci', icon: UsersIcon },
    { path: '/dochazka/admin/kriteria', label: 'Kriteria', icon: CriteriaIcon },
  ];

  const router = useRouter();

  const createSideBar = () => {
    const path = router.pathname;
    switch (true) {
      case path.startsWith('/dochazka'):
        return <SideBar color="#CF54A5" links={dochazkaLinks} />;
      case path.startsWith('/knihovna/'):
      // return <SideBar color="red" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      {createSideBar()}
      <TopBar />
     <div className='pt-[90px] pl-[90px] pr-[30px] pb-[30px]'>{children}</div> 
    </div>
  );
};

export default NavigationLayout;
