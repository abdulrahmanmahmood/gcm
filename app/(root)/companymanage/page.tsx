import Welcome from "@/app/_components/UI/Welcome";
import UserManagementTable from "@/app/_components/UserManagementTable";
import React from "react";
import { FaBuildingUser } from "react-icons/fa6";
import { IoDocumentAttach } from "react-icons/io5";

const page = () => {
  return (
    <div className="flex flex-row">
      <Welcome
        title="Companies"
        text1="Client Companies"
        text2="Subcontractor Companies"
        url="companymanage/clientcompanies"
        icon={
          <FaBuildingUser className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Projects"
        text1="Total cost ,Remain cost"
        text2="Start date."
        url="companymanage/projects"
        icon={
          <IoDocumentAttach className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
    </div>
  );
};

export default page;
