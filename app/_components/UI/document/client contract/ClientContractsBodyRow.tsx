"use client";
import React, { useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { ClientContract, Project, User } from "../../../../_interfaces";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";

interface IProps {
  contract: ClientContract;
}

const ClientContractsBodyRow = ({ contract }: IProps) => {
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const toggleModal = () => {
    setShowModal((prev: boolean) => !prev); // Toggle modal state
  };
  return (
    <tr key={contract?.id} className="hover:bg-gray-50">
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

      {/* Company Name ,  */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold">
          {contract?.company?.name}
        </span>
      </td>

      {/* Project Name ,  */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold">
          {contract?.project?.name}
        </span>
      </td>

      {/* Total Cost Value */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold">
          {contract?.cost}
        </span>
      </td>

      {/* Start Date */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {contract?.startDate}
        </span>
      </td>

      {/* End Date */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center text-nowrap">
          {contract?.endDate}
        </span>
      </td>

      {/* Action Options */}
      <td className="">
        <button
          className="flex justify-center items-center h-full mx-auto relative"
          onClick={toggleModal}
        >
          <SlOptionsVertical />
        </button>
        {showModal && (
          <div className="absolute right-9 z-10 mt-3 w-20 rounded-md bg-[#6B779A1A] shadow-lg">
            <div className="flex flex-col gap-1">
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link href={`clientcontract/${contract?.id}`}>View</Link>
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-petrol hover:bg-gray-100">
                <Link
                  href={`/documentmanage/clientcontract/edit/${contract?.id}`}
                >
                  Edit
                </Link>
              </button>
            </div>
          </div>
        )}{" "}
      </td>

      {/* End of the Table body row */}
    </tr>
  );
};

export default ClientContractsBodyRow;
