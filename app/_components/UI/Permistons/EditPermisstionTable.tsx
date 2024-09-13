"use client";
import React, { useCallback, useEffect, useState } from "react";
import EditPermissonTableHeader from "./EditPermissonTableHeader";
import EditPermissionTableBodyRow from "./EditPermissionTableBodyRow";
import { useMutation } from "@tanstack/react-query";
import { getuserPermissions } from "@/app/_utils/permissions/getUserPermissions";
import { PermissonUser, Row } from "@/app/_interfaces";
import { BiIdCard } from "react-icons/bi";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { UpdateUserPermissions } from "@/app/_utils/permissions/UpdateUserPermissions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Iprops {
  rows: Row[];
  userId: number;
  userData: PermissonUser;
}

const EditPermisstionTable = ({ rows, userId, userData }: Iprops) => {
  const [permissions, setPermissions] = useState<Row[]>(
    rows.map((row) => ({ ...row, selected: row.selected || false }))
  );

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: UpdateUserPermissions,
    onSuccess: () => {
      toast.success("Permissions updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating permissions:", error);
      toast.error("Failed to updating permissions");
    },
  });

  // ///////////////// Handlers   ///////////////////////////

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((row) =>
        row.permission === permission ? { ...row, selected: checked } : row
      )
    );
  };

  const handleSave = async () => {
    // Collect selected permissions
    const selectedPermissions = permissions
      .filter((row) => row.selected)
      .map((row) => row.permission);

    console.log(
      `user Update Permissions Data ${userId}, ${selectedPermissions}`
    );
    mutate({ userId, selectedPermissions });
  };
  return (
    <>
      <div className="flex flex-row w-full pr-8 pl-5 justify-between">
        <div className="w-[50%] space-x-8 flex flex-row items-center align-baseline">
          <IoIosArrowDropleftCircle className="text-petrol text-5xl " />
          <img
            className="h-[75px] w-[75px] rounded-full object-cover object-center"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h1 className="text-petrol text-xl font-semibold">
            {userData?.fullName}
          </h1>
        </div>

        <div className="w-[40%] flex flex-row my-auto justify-between">
          <button
            className="py-2 px-8 bg-petrol rounded-lg text-white text-xl"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving...." : "Save"}
          </button>
          <button className="w-[45%] bg-petrol text-white py-2 px-4 flex items-center justify-center rounded-lg">
            <BiIdCard className="text-2xl mr-2" />
            View Profile
          </button>
        </div>
      </div>

      {/* component */}
      <div className="overflow-auto h-[90vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white  text-sm text-petrol text-center text-nowrap ">
          <EditPermissonTableHeader />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 h-[60vh]">
            {rows.map((row: Row) => (
              <EditPermissionTableBodyRow
                key={row.description}
                row={row}
                userId={userId}
                onPermissionChange={handlePermissionChange}
              />
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default EditPermisstionTable;
