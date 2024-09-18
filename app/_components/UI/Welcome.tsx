import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";

interface IProps {
  title: string;
  icon?: JSX.Element;
  text1: string;
  text2: string;
  url: string;
}

const Welcome = ({ title, icon, text1, text2, url }: IProps) => {
  return (
    <Link href={`${url}`}>
      <div className="w-80   mx-5 my-4 h-[340px]">
        <div className="w-full h-[80%] bg-[#E8E8E8] py-3">
          <div className="h-40 w-40 rounded-full bg-white mx-auto py-7">
            {/* <FaUsers className="text-petrol text-[100px] text-center mx-auto " /> */}
            {icon}{" "}
          </div>
          <h3 className="text-petrol text-center mt-3 font-bold text-3xl">
            {title}
          </h3>
        </div>
        <div className="w-full  bg-petrol px-3 py-3 text-white flex justify-between">
          <div>
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
          <div className="my-auto">
            <IoIosArrowDropright className="text-4xl text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Welcome;
