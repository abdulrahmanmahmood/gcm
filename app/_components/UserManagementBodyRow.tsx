"use client";
import React, { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { User } from "../_interfaces";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

interface IProps {
  user: User;
  onSelect: (userId: number, isSelected: boolean) => void;
  isChecked: boolean;
}

const UserManagementBodyRow = ({ user, onSelect, isChecked }: IProps) => {
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const formattedDate = new Date(user.createdDate).toLocaleDateString("en-GB");
  const formattedRole = user.role
    ?.split("_") // Split the string by the underscore
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase()) // Capitalize first letter, make the rest lowercase
    .join(" ");

  const toggleModal = () => {
    setShowModal((prev: boolean) => !prev); // Toggle modal state
  };

  return (
    <tr key={user.id} className="hover:bg-gray-50">
      {/* Check Box */}
      <td className="px-6 py-4 whitespace-nowrap mx-auto  ">
        <div className="flex items-center">
          <input
            id="checkbox-all"
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
            checked={isChecked}
            onChange={() => onSelect(user.id, !isChecked)}
          />
          {/* <label htmlFor="checkbox-all" className="sr-only">
          checkbox
        </label> */}
        </div>
      </td>

      {/* FullName , Avatar And Email */}
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          {user.pictureExists && user.picture ? (
            <img
              src={`data:${user.picture.contentType};base64,${user.picture.data}`}
              alt="Uploaded"
            />
          ) : (
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{user.fullName}</div>
          <div className="text-gray-400">{user.email}</div>
        </div>
      </th>

      {/* IC */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold">
          {user.id}
        </span>
      </td>

      {/* Email Value */}
      {/* <td className="px-6 py-4">Product Designer</td> */}

      {/* Gender Value */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {user.gender}
          </span>
        </div>
      </td>

      {/* Role Value */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {user.salary} $
        </span>
      </td>

      {/* Role Value */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {formattedRole}
        </span>
      </td>

      {/* REgistration Date */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {formattedDate}
        </span>
      </td>

      {/* Enabled True Or False */}
      <td className="px-6 py-2 ">
        {user.enabled == true ? (
          <div className="flex  space-x-1">
            <span className="bg-greening size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              True
            </span>
          </div>
        ) : (
          <div className="flex  space-x-1">
            <span className="bg-redd size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              False
            </span>
          </div>
        )}
      </td>

      {/* Locked True Or False */}
      <td className="px-6 py-2 ">
        {user.locked == false ? (
          <div className="flex  space-x-1">
            <span className="bg-redd size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              False
            </span>
          </div>
        ) : (
          <div className="flex  space-x-1">
            <span className="bg-greening size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              True
            </span>
          </div>
        )}
      </td>

      {/* Action Options */}
      <td className="">
        {/* <Link href={`users/${user.id}`}> */}{" "}
        <button
          className="flex justify-center items-center h-full mx-auto relative"
          onClick={toggleModal}
        >
          <SlOptionsVertical />
        </button>
        {/* </Link> */}
        {showModal && (
          <div className="absolute right-10 z-10 mt-4 w-20 rounded-md bg-[#6B779A1A] shadow-lg">
            <div className="flex flex-col gap-0 bg-white border border-spacing-1 rounded-sm shadow-sm">
              <button className="w-full text-left px-3 py-2 pb-0 mb-0 text-sm text-petrol hover:bg-gray-100">
                <Link href={`users/${user.id}`}>View</Link>
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={`/usermanage/users/edit/${user.id}`}>Edit</Link>
              </button>
            </div>
          </div>
        )}{" "}
      </td>

      {/* End of the Table body row */}
    </tr>
  );
};

export default UserManagementBodyRow;
