"use client";
import Image from "next/image";
import newPasswordImage from "../../../public/nwepassowrd.png";
import { useState } from "react";
import CreateNewPasswordForm from "@/app/_components/CreteNewPasswordForm";

interface IProps {}

const Page: React.FC<IProps> = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="container flex flex-col items-center content-center  mx-auto py-10 my-auto">
        <Image
          src={newPasswordImage}
          alt="new password image"
          width={70}
          height={70}
          className="mx-auto"
        />
        <h1 className="text-center font-bold text-3xl my-3">
          Create new password
        </h1>
        <p className="text-center text-[18px] text-[#565656]">
          Your new password must be different from previous used passwords.
        </p>
        <div className="w-[40%] mx-auto">
          <CreateNewPasswordForm />
        </div>{" "}
      </div>
    </div>
  );
};

export default Page;
