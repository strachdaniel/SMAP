import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SideBarIcon(props: { src: string; alt: string; path: string }) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false); // Keep track of active status

  useEffect(() => {
    // Update active status whenever the path changes
    setIsActive(router.pathname === props.path);
  }, [router.pathname, props.path]);

  return (
    <div className="w-full h-[48px] flex justify-center items-center relative group">
      <div
        className={`bg-${
          isActive ? 'primary' : 'gray'
        } h-full w-[6px] absolute left-0 transition-all duration-500`}
        style={{ transform: isActive ? 'scaleY(1)' : 'scaleY(0)' }} // Use transform to animate the height change
      ></div>
      <Image src={props.src} alt={props.alt} className="w-[24px] h-[24px]" />
      <div className="hidden absolute top-0 left-12 mt-6 p-2 rounded-md bg-black text-red w-[80px] h-[50px] text-white justify-center items-center">
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
