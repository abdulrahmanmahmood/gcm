import { PermissonUser } from "@/app/_interfaces";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

interface IProps {
  user: PermissonUser;
}

const PermissionTableBodyRow = ({ user }: IProps) => {
  return (
    <tr key={user.id} className="hover:bg-gray-50 ">
      {/* FullName , Avatar And Email */}
      <th className="flex gap-5 px-6 py-4 font-normal text-gray-900 ">
        <div className="relative h-10 w-10 ">
          {user.pictureExists && (
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-petrol">{user.fullName}</div>
          <div className="text-gray-400">{user.email}</div>
        </div>
      </th>

      {/* Permissions Date */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {user.permissions}
        </span>
      </td>

      {/* Action Options */}
      <td className="">
        <Link href={`/usermanage/permissions/edit/${user.id}`}>
          {" "}
          <div className="flex justify-center items-center h-full text-center text-lg">
            <FaRegEdit className="text-xl my-auto mx-1" />
            Edit{" "}
          </div>
        </Link>
      </td>

      {/* End of the Table body row */}
    </tr>
  );
};

export default PermissionTableBodyRow;
