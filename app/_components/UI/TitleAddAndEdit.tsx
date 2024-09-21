import React from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
interface IProps {
  title: string;
}

const TitleAddAndEdit = ({ title }: IProps) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-petrol items-center">
        <IoIosArrowDropleftCircle className="text-petrol text-4xl my-auto inline-block mr-5" />
        {title}
      </h2>
    </div>
  );
};

export default TitleAddAndEdit;
