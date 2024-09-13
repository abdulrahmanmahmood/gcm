import Link from "next/link";
import React from "react";

const ClientManagementNav = () => {
  return (
    <div className="w-full flex flex-row space-x-6 my-5">
      <input
        type="text"
        placeholder="Search here"
        className="bg-[#F5F7FB] w-[80%] px-3 mx-2 rounded-lg focus:border-petrol focus:ring-petrol"
      />
      <div className="flex flex-row space-x-7">
        <div className="w-36 text-center rounded-lg text-white py-3 bg-petrol cursor-pointer">
          Filter
        </div>
        <Link
          href="/usermanage/clients/addclient"
          className="w-36 text-center rounded-lg text-white py-3 bg-petrol cursor-pointer"
        >
          Add New
        </Link>
      </div>
    </div>
  );
};

export default ClientManagementNav;
