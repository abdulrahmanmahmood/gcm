import PermissionsNav from "@/app/_components/UI/Permistons/PermissionsNav";
import PermisstionTable from "@/app/_components/UI/Permistons/PermisstionTable";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full">
      <PermissionsNav />
      <PermisstionTable />
    </div>
  );
};

export default page;
