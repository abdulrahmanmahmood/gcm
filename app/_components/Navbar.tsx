"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

interface Iprops {
  name: string;
  email: string;
  image: StaticImageData;
}

const Navbar = ({ name, email, image }: Iprops) => {
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    // Setting the name and email when props change
    if (name && email) {
      setUserData({ name, email });
    }
  }, [name, email]);

  

  return (
    <div className="w-full px-2 lg:px-5 flex flex-row h-[70px] bg-white top-0 justify-between">
      <span className="my-auto text-right text-[#2E7490]"></span>
      <div className="h-full flex space-x-3 lg:space-x-7 ">
        <FaBell className="text-2xl my-auto items-center text-[#2E7490]" />

        <div className="h-full flex flex-row items-center space-x-4 my-auto justify-center">
          <Image className="rounded-full size-10" alt="avatar" src={image} />
          <div className="flex-col text-xs my-auto hidden md:flex">
            <span className="text-[#2E7490]">{userData.name}</span>
            <span>{userData.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
