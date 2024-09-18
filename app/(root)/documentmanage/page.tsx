import Welcome from "@/app/_components/UI/Welcome";
import React from "react";
import { SlNote } from "react-icons/sl";
import { FaFileContract } from "react-icons/fa6";
import { RiContractFill } from "react-icons/ri";
import { RiRecycleFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";

const page = () => {
  return (
    <div className="flex flex-wrap">
      <Welcome
        title="Client Contracts"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="documentmanage/clientcontract"
        icon={
          <SlNote className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Subcontractors Contracts"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="documentmanage/subcontractors"
        icon={
          <RiContractFill className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title=" Delivery Notes "
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="documentmanage/deliverynotes"
        icon={
          <GiNotebook className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Recycle Receipts"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="documentmanage/recyclereceipts"
        icon={
          <RiRecycleFill className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Manifests"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="documentmanage/manifests"
        icon={
          <FaFileContract className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
    </div>
  );
};

export default page;
