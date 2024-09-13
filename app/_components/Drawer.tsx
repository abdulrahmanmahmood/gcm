"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import { DrawerItems } from "../_constants";
import { RiLogoutCircleLine } from "react-icons/ri";

interface Iprops {}

const Drawer = ({}: Iprops) => {
  const pathname = usePathname();

  return (
    <div className="mt-4 px-1 md:px-2 lg:px-3 flex flex-col  max-md:h-[90vh] h-[70vh] relative">
      <div className="">
        {DrawerItems.map((item) => (
          <Link href={item.url} key={item.id}>
            <div
              className={`flex flex-row hover:bg-[#2E7490] hover:text-white justify-start items-center my-4 rounded-lg px-4 gap-3 py-2 text-left  text-nowrap 
                ${pathname === item.url ? "bg-[#2E7490] text-white" : " "}`}
              style={{
                background: `${pathname === item.url ? "#2E7490" : ""}`,
              }}
            >
              <div className="max-lg:text-center max-lg::mx-auto">
                {item.icon}
              </div>
              <span className="text-center my-auto text-xs md:text-sm hidden  lg:block ">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button className="text-[#C32B43] lg:text-xl text-xs px-1 md:px-2 lg:px-4 items-center lg:w-[220px] md:w-[160px] w-[100px] py-3 absolute bottom-0 ">
        <div className="flex flex-row  font-bold mr-3 text-nowrap">
          <RiLogoutCircleLine className="text-3xl my-auto mx-auto " />
          <p className="hidden lg:block">Log out</p>
        </div>
      </button>
    </div>
  );
};

export default Drawer;
