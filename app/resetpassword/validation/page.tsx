"use client";
import React, { useRef, useState } from "react";

import VerificationHeader from "@/app/_components/VerificationHeader";
import VerificationCodeInput from "@/app/_components/verificationCodeInput";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstant from "@/app/_axios/axios";

const page = () => {
  const fieldsRef = useRef<HTMLDivElement>(null);

  const email = getCookie("email") || null;
  console.log("emial in validation is >>", email);

  const [state, setState] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  //////////////////////////////////  Handlers  //////////////////////////////////////////////////

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setState({ ...state, [key]: e.target.value });
  };

  const inputFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1) {
      const next = e.currentTarget.dataset.index;
      if (fieldsRef.current) {
        const nextField =
          fieldsRef.current.querySelectorAll("input")[parseInt(next!) + 1];
        if (nextField) (nextField as HTMLInputElement).focus();
      }
    }
  };
  const handleContinue = async () => {
    const fullCode = `${state.code1}${state.code2}${state.code3}${state.code4}${state.code5}${state.code6}`;
    console.log("Verification Code:", fullCode);

    try {
      if (!email) return;
      const response = await axiosInstant.post(
        "/api/v1/authentication/validate-code",
        {
          email: email, // Assuming email is already retrieved and stored in a state or context
          code: fullCode,
        }
      );

      console.log("Server response:", response.data);
      console.log(`fullCode is >> ${fullCode}
        and here is the email>>${email}
        `);

      toast.success("Code validated successfully!");

      // Optional: Redirect or perform further actions upon success
    } catch (error) {
      console.error("Error validating code:", error);
      toast.error("Failed to validate code. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen items-center justify-center flex">
      <div className="container flex flex-col items-center space-y-14 py-10">
        <VerificationHeader email={email} />
        <div className="items-center justify-center text-center flex flex-col gap-3 ">
          <VerificationCodeInput
            state={state}
            handleChange={handleChange}
            inputFocus={inputFocus}
            fieldsRef={fieldsRef}
          />
          <span className="text-black text-sm">
            Re send Code in <span className="text-blue-600 text-xs">00:32</span>
          </span>
        </div>
        <button
          className="w-[450px] px-3 py-5 bg-[#2E7490] mb-5 text-lg font-bold leading-none text-white rounded-2xl"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default page;
