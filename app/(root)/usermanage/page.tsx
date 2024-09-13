import Welcome from "@/app/_components/UI/Welcome";
import React from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex flex-row">
      <Welcome
        title="Users"
        text1="Users"
        text2="Clients"
        url="usermanage/users"
        icon={
          <FaUsers className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Permissions"
        text1="Assign and modify user roles and "
        text2="permissions."
        url="usermanage/permissions"
        icon={
          <AiOutlineFileProtect className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
    </div>
  );
};

export default page;
