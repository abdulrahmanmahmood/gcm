import Welcome from "@/app/_components/UI/Welcome";
import React from "react";
import { CiBoxes } from "react-icons/ci";

const page = () => {
  return (
    <div className="flex flex-wrap">
      <Welcome
        title="Client Containers"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="containermanage/clientcontainers"
        icon={
          <CiBoxes className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
    </div>
  );
};

export default page;
