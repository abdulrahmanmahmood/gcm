"use client";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import { useState } from "react";
import { setCookie } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstant from "../_axios/axios";

const Page = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // handlers

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstant.post(
        "/api/v1/authentication/find-account",
        { email }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        toast.success(`${response.data.message} - Check your email`);
      }
      setCookie("email", email);

      setTimeout(() => {
        router.push("resetpassword/validation");
      }, 2000); // 2-second delay
      // Handle success response here (e.g., show a success message)
    } catch (error: any) {
      console.error("Error:", error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("An error occurred while sending the email.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen items-center justify-center flex">
        <div className="container w-[90%] h-[80%] flex flex-col mx-auto ">
          <Image
            src={logo}
            alt="reset image logo"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="text-center font-bold text-4xl my-3">
            Reset Password
          </h1>
          <p className="text-center text-[#7D7D7D] my-3">
            We will send an email with instructions to reset your password
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-[40%] px-[3%] mx-auto space-y-6 mt-[40px]"
          >
            <div className="mx-auto relative max-w-2xl">
              <svg
                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full pl-12 pr-3 py-4 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-3 py-5 mb-5 text-lg font-bold leading-none text-white rounded-2xl ${
                isLoading ? "bg-gray-400" : "bg-[#2E7490]"
              }`}
            >
              {isLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08147 50.5908C9.08147 74.1389 26.4519 91.5094 50 91.5094C73.5481 91.5094 90.9185 74.1389 90.9185 50.5908C90.9185 27.0427 73.5481 9.67225 50 9.67225C26.4519 9.67225 9.08147 27.0427 9.08147 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5534C95.2932 28.8224 92.871 24.3692 89.8167 20.348C85.8435 15.1192 80.6514 10.7238 74.7001 7.65628C68.7488 4.58877 62.1657 2.91536 55.4187 2.8296C48.6718 2.74383 42.0344 4.25186 35.9232 7.24342C33.1083 8.68074 32.0737 12.0836 33.5109 14.8984C34.9482 17.7133 38.351 18.7479 41.1659 17.3106C45.8208 14.9664 50.8096 13.9121 55.8502 14.1251C60.8907 14.3382 65.7809 15.8117 70.1384 18.4346C74.496 21.0575 78.1916 24.7558 80.9049 29.2058C83.1478 33.0847 84.5746 37.4355 85.1045 41.9127C85.4997 45.1696 88.0751 47.5094 91.322 47.5094C91.6538 47.5094 91.9863 47.4799 92.3169 47.4207L93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
