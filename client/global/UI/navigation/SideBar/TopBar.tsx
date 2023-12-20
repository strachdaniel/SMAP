import SearchInput from './SearchBar/SearchInput';
import UserBadge from './UserBadge';

export default function TopBar() {
  return (
    <div className="bg-white h-[60px] flex items-center fixed top-0 left-[60px] w-screen">
      <div className="w-[60px]">
        <h2 className="ml-5">UniEdu</h2>
      </div>
      <div className="flex-grow flex-1"></div>
      <UserBadge />
      <div className="w-[60px] bg-white"></div>
    </div>
  );
}
