import Image from "next/image";
import emailIcon from "../../public/emailIcon.png";

interface IVerificationHeaderProps {
  email: string | null;
}

const VerificationHeader = ({ email }: IVerificationHeaderProps) => {
  return (
    <>
      <Image
        src={emailIcon}
        alt="email icon in validate email at forget password"
        width={88}
        height={88}
        className="mx-auto"
      />
      <h1 className="text-[40px] text-center font-bold">Verification</h1>
      <p className="text-[15px] text-center text-[#7D7D7D]">
        We’ve sent you the verification code on{" "}
        <span className="text-blue-600 text-sm">{email}</span>
      </p>
    </>
  );
};

export default VerificationHeader;
