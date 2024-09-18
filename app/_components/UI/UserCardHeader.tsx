import Image, { StaticImageData } from "next/image";
import React from "react";
import testImage from "../../../public/logo.jpg";
import Link from "next/link";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
interface Iprops {
  image?: string | StaticImageData;
  email: string;
  id: string;
  gender: string;
  name: string;
  Role: string | undefined;
  enabled: boolean;
  locked: boolean;
  url: string;
}

const UserCardHeader = ({
  image,
  Role,
  email,
  enabled,
  gender,
  id,
  locked,
  name,
  url,
}: Iprops) => {
  return (
    <div className="w-full px-9 pt-4 flex-auto min-h-[70px] pb-0 bg-transparent my-5 py-10">
      <Link href={"/usermanage/clients"}>
        <IoIosArrowDropleftCircle
          className="text-petrol text-5xl cursor-pointer mb-7"
          // onClick={handleBackClick}
        />
      </Link>
      <div className="flex flex-wrap mb-6 xl:flex-nowrap">
        <div className="mb-5 mr-5">
          <div className="relative inline-block shrink-0 rounded-2xl">
            <Image
              className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
              src={testImage}
              alt="image"
            />
            <div className="group/tooltip relative">
              <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2 border border-white" />
              <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block">
                Status: Active
              </span>
            </div>
          </div>
        </div>
        <div className="grow">
          <div className="flex flex-wrap items-start justify-between mb-2">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <p className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                  {name}
                </p>
              </div>
              <div className="flex flex-wrap pr-2 mb-4 font-medium">
                <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary text-petrol">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-petrol"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </span>
                  {email}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap my-auto">
              <Link
                href={url}
                className="inline-block px-6 bg-petrol text-white py-1.5 mr-3 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-lg text-muted bg-light border-light hover:bg-light-dark active:bg-light-dark focus:bg-light-dark"
              >
                <FaEdit className="mr-2 inline-block my-auto text-xl" />
                Edit
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap items-center">
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                ID: <span className="ml-2 text-petrol">{id}</span>
              </p>
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                Gender <span className="ml-2 text-petrol">{gender}</span>
              </p>
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                Role <span className="ml-2 text-petrol">{Role}</span>
              </p>
            </div>
          </div>
          {/* Status Section */}
          <div className="px-9  justify-between bg-transparent my-3 ">
            <div className="flex items-center space-x-14">
              <span className="mr-2 text-petrol">Enabled</span>{" "}
              <span
                className={` ${
                  enabled == true ? "text-greening" : "text-redd"
                }`}
              >
                ●
              </span>{" "}
              {enabled == true ? "_True" : "_False"}
              <span className="mr-2 text-petrol">Locked</span>{" "}
              <span
                className={` ${locked == true ? "text-greening" : "text-redd"}`}
              >
                ●
              </span>{" "}
              {locked == true ? "_True" : "_False"}
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-px border-neutral-200" />
    </div>
  );
};

export default UserCardHeader;
