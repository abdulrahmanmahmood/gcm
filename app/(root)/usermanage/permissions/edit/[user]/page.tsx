"use client";
import EditPermisstionTable from "@/app/_components/UI/Permistons/EditPermisstionTable";
import PermissionsNav from "@/app/_components/UI/Permistons/PermissionsNav";
import PermisstionTable from "@/app/_components/UI/Permistons/PermisstionTable";
import { getuserPermissions } from "@/app/_utils/permissions/getUserPermissions";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { BiIdCard } from "react-icons/bi";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const page = ({ params }: { params: { user: string } }) => {
  const userId = parseInt(params.user, 10);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  ///////////// Fetching UserPermissions /////////////////////////////////
  const { data, error, isLoading } = useQuery({
    queryKey: ["userPermissions", userId],
    queryFn: () => getuserPermissions(userId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!data || !data) {
    return <div>No user data found</div>;
  }
  if (data) {
    // console.log("user Permissiions", data);
  }
  const userData = data.data;
  // ///////////////////////////////////////////////////////
  ////////////////    Handlers      /////////////////////

  return (
    <div className="w-full flex flex-col">
      {/* <PermissionsNav /> */}
      <EditPermisstionTable
        rows={userData.rows}
        userId={userData.id}
        userData={userData}
      />
      I
    </div>
  );
};

export default page;
