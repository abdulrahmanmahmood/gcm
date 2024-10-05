"use client";
import Image from "next/image";
import emailIcon from "../../public/emailIcon.png";
import { useEffect, useState } from "react";

interface IVerificationHeaderProps {
  email?: string | null;
}

const VerificationHeader = ({ email }: IVerificationHeaderProps) => {
  const [clientEmail, setClientEmail] = useState<string | null>("");
  // Set the email on the client side to avoid SSR mismatch
  useEffect(() => {
    if (email) {
      setClientEmail(email);
    }
  }, [email]);

  return (
    <>
      <Image
        src={emailIcon ? emailIcon : ""}
        alt="email icon in validate email at forget password"
        width={88}
        height={88}
        className="mx-auto"
      />
      <h1 className="text-[40px] text-center font-bold">Verification</h1>
      <p className="text-[15px] text-center text-[#7D7D7D]">
        We’ve sent you the verification code on{" "}
        <span className="text-blue-600 text-sm">{clientEmail}</span>
      </p>
    </>
  );
};

export default VerificationHeader;
