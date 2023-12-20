import SearchInput from "./SearchBar/SearchInput";
import UserBadge from "../UserBadge";

export default function TopBar() {
  return (
    <div className="bg-white h-[60px] mx-[60px] flex items-center fixed top-0 w-screen">
      <div className="w-[60px]">
        <h2 className="ml-5">KNIHOVNA</h2>
      </div>
      <div className="flex-grow"></div>
      <SearchInput></SearchInput>
      <div className="flex-grow"></div>
      <UserBadge />
      <div className="w-[60px] flex-1 bg-white"></div>
    </div>
  );
}
