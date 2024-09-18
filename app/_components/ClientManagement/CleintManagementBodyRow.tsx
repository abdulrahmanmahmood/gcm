"use client";
import { Cleint } from "@/app/_interfaces";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";

interface IProps {
  user: Cleint;
}

const CleintManagementBodyRow = ({ user }: IProps) => {
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
      <td className="px-6 py-4 whitespace-nowrap mx-auto">
        <div className="flex items-center">
          <input
            id="checkbox-all"
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%] focus:ring-petrol "
          />
        </div>
      </td>

      {/* FullName, Avatar, and Email */}
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

      {/* ID */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold">
          {user.id}
        </span>
      </td>

      {/* Gender */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {user.gender}
          </span>
        </div>
      </td>

      {/* Salary */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {user?.company?.name} $
        </span>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {formattedRole}
        </span>
      </td>

      {/* Registration Date */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {formattedDate}
        </span>
      </td>

      {/* Enabled */}
      <td className="px-6 py-2">
        {user.enabled ? (
          <div className="flex space-x-1">
            <span className="bg-greening size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              True
            </span>
          </div>
        ) : (
          <div className="flex space-x-1">
            <span className="bg-redd size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              False
            </span>
          </div>
        )}
      </td>

      {/* Locked */}
      <td className="px-6 py-2">
        {user.locked ? (
          <div className="flex space-x-1">
            <span className="bg-greening size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              True
            </span>
          </div>
        ) : (
          <div className="flex space-x-1">
            <span className="bg-redd size-4 rounded-full my-auto" />
            <span className="inline-flex items-center text-nowrap my-auto">
              False
            </span>
          </div>
        )}
      </td>

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
          <div className="absolute right-10 z-10 mt-18 w-20 rounded-md bg-[#6B779A1A] shadow-lg">
            <div className="flex flex-col gap-1">
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={`clients/${user.id}`}>View</Link>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={`clients/edit/${user.id}`}>Edit</Link>
              </button>
            </div>
          </div>
        )}{" "}
      </td>
    </tr>
  );
};

export default CleintManagementBodyRow;
