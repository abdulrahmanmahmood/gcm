import CleintManagementTable from "@/app/_components/ClientManagement/CleintManagementTable";
import ClientManagementNav from "@/app/_components/ClientManagement/ClientManagementNav";
import UserManagementHeader from "@/app/_components/UI/UserManagementHeader";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <UserManagementHeader />
      <ClientManagementNav />
      <CleintManagementTable />
    </div>
  );
};

export default page;
