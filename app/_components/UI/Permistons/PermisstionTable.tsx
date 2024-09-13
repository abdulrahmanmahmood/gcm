"use client";
import React from "react";
import UserManagmentTableHeader from "../../UserManagmentTableHeader";
import PermissonTableHeader from "./PermissonTableHeader";
import UserManagementBodyRow from "../../UserManagementBodyRow";
import PermissionTableBodyRow from "./PermissionTableBodyRow";
import { permission } from "process";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/_utils/permissions/getUsers";
import { PermissonUser } from "@/app/_interfaces";

const user = {
  fullName: "Ahmed Mohammed",
  email: "ahmed@gmail.com",
  permission: 34,
  id: 3,
};

const PermisstionTable = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: getUsers,
  });
  if (data) {
    console.log("permission data", data);
  }
  if (error) {
    console.log("error", error);
  }
  if (isLoading) {
    console.log("isLoading", isLoading);
  }

  return (
    <>
      {/* component */}
      <div className="overflow-auto h-[90vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <PermissonTableHeader />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 h-[60vh]">
            {data?.data?.content?.map((user: PermissonUser) => (
              <PermissionTableBodyRow key={user.id} user={user} />
            ))}

            {/* {Array.from({ length: 20 }, (_, index) => (
              <PermissionTableBodyRow key={index} user={user} />
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PermisstionTable;
