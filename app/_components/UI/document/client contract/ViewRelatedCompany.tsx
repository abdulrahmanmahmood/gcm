import { ClientContract } from "@/app/_interfaces";
import Image from "next/image";
import React from "react";
import logo from "@/public/logo.jpg";
import { IoIosArrowDropleftCircle } from "react-icons/io";
interface Iprops {
  image: string;
  name: ClientContract["name"];
}

const ViewRelatedCompany = ({ image, name }: Iprops) => {
  return (
    <div className="w-full   p-1 flex flex-col">
      <div className="w-full justify-start">
        <IoIosArrowDropleftCircle className="text-petrol ml-7 mt-5 text-[45px] my-auto inline-block mr-5" />
      </div>{" "}
      <div className="mx-auto">
        <Image
          src={logo}
          // sizes="150px"

          alt={`${name} image`}
          className="size-[180px] mx-auto"
        />
        <h2 className="text-petrol font-semibold text-center my-5 text-3xl mx-auto text-nowrap">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default ViewRelatedCompany;
