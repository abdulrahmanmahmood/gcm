"use client";
import React from "react";
import Link from "next/link";
import { HiUsers } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { usePathname } from "next/navigation";

function CMHeader() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex flex-row w-[30%] space-x-24 my-5 ml-8">
      <Link href="/companymanage/clientcompanies">
        <div
          className={`px-12 py-3 rounded-lg ${
            pathname == "/companymanage/clientcompanies"
              ? "bg-petrol text-white"
              : "bg-[#DCDCDC] text-white"
          }   flex flex-row  space-x-3`}
        >
          <HiUsers className="my-auto text-xl text-white " />{" "}
          <span className="my-auto text-nowrap">Client Companies</span>
        </div>
      </Link>
      <Link href={"/companymanage/subercontainercompanies"}>
        <div
          className={`px-12 py-3 rounded-lg ${
            pathname == "/companymanage/subercontainercompanies"
              ? "bg-petrol text-white"
              : "bg-[#DCDCDC] text-white"
          }   flex flex-row  space-x-3`}
        >
          <IoIosPeople className="my-auto text-2xl text-white " />
          <span className="my-auto text-nowrap">Subcontractor Companies</span>
        </div>
      </Link>
    </div>
  );
}

export default CMHeader;
