import SideBar from "../UI/SideBar/SideBar";
import TopBar from "../UI/SideBar/TopBar";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <SideBar />
      <TopBar />
      <section className="ml-[60px] mt-[60px] h-full w-full">{children}</section>
    </div>
  );
}
