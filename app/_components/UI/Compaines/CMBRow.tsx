"use client";
import React, { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import { Company } from "@/app/_interfaces";

interface IProps {
  user: Company;
  viewLink: string;
  editLink: string;
}

const CMBRow = ({ user, viewLink, editLink }: IProps) => {
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const toggleModal = () => {
    setShowModal((prev: boolean) => !prev); // Toggle modal state
  };

  return (
    <tr key={user.id} className="hover:bg-gray-50">
      {/* Check Box */}
      <td className="px-6 py-4 whitespace-nowrap mx-auto ">
        <div className="flex items-center">
          <input
            id="checkbox-all"
            type="checkbox"
            className="size-8 text-petrol accent-petrol bg-gray-100 rounded-[50%]  focus:ring-petrol "
          />
          {/* <label htmlFor="checkbox-all" className="sr-only">
          checkbox
        </label> */}
        </div>
      </td>

      {/* FullName , Avatar And Email */}
      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{user.name}</div>
        </div>
      </th>

      {/* ID */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold">
          {user.id}
        </span>
      </td>

      {/* Email Value */}
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {user.email}
          </span>
        </div>
      </td>

      {/* Business status Value */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {user.status} $
        </span>
      </td>

      {/* Industry Value */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {user.industry}
        </span>
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
          <div className="absolute right-10 z-10 mt-18 w-20 rounded-md bg-[#6B779A1A] shadow-lg">
            <div className="flex flex-col gap-1">
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={viewLink}>View</Link>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={editLink}>Edit</Link>
              </button>
            </div>
          </div>
        )}{" "}
      </td>

      {/* End of the Table body row */}
    </tr>
  );
};

export default CMBRow;
