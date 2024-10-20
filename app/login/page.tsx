"use client";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import loginImage from "../../public/login/LoginImage.png";
import { Fragment, useState } from "react";
import Link from "next/link";
import axiosInstant, { baseUrl } from "../_axios/axios";
import { LoginFormData } from "../_interfaces";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../_react_query/api/auth";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface ErrorResponse {
  message: string;
  // Add other possible fields from your error response here if necessary
}

const Page = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false); // New state for password visibility

  const router = useRouter();

  /////////////////////////////// HANDLERS //////////////////////////

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("login Succesful:", data);
      toast.success("Login Success");
      console.log("token", data.data);

      const { sub: name, exp } = jwtDecode(data.data);
      console.log("user name form the jwt after login is >>", name);
      setCookie("UserName", name);
      setCookie("token", data.data);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    onError: (error) => {
      const errorMessage =
        (error as any).response?.data?.message ||
        "An Error Occured during login";
      console.log("server error ", errorMessage);
      setError("Login failed. please check your email and password");
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    loginMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Fragment>
      <div className="h-screen mx-auto my-auto items-center content-center">
        <div className="flex flex-row w-[90%] mx-auto justify-between">
          <div className="w-[50%] px-[5%] mx-auto flex flex-col">
            <Image
              alt="logo"
              src={logo}
              className="mx-auto"
              width={200}
              height={200}
            />
            <div className="w-[80%] mx-auto">
              <h3 className="mb-5 text-left pl-[50px] text-4xl text-dark-grey-900">
                Sign In
              </h3>
              <form
                className="flex flex-col text-center bg-white mx-auto w-[75%]"
                onSubmit={handleSubmit}
              >
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 border-[#DCDCDC] border-[1px] text-dark-grey-900 rounded-2xl"
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"} // Dynamic input type
                    placeholder="Enter a password"
                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 border-[#DCDCDC] border-[1px] text-dark-grey-900 rounded-2xl"
                    onChange={handleChange}
                  />
                  <svg
                    onClick={togglePasswordVisibility} // Add the onClick event
                    width="21"
                    height="22"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-4"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.5 3.34375C7.2489 3.34375 4.8937 4.62704 3.35541 6.22449C1.84323 7.79483 1.09375 9.70066 1.09375 11C1.09375 12.2993 1.84323 14.2052 3.35541 15.7755C4.8937 17.373 7.2489 18.6562 10.5 18.6562C13.7511 18.6562 16.1063 17.373 17.6446 15.7755C19.1568 14.2052 19.9062 12.2993 19.9062 11C19.9062 9.70066 19.1568 7.79483 17.6446 6.22449C16.1063 4.62704 13.7511 3.34375 10.5 3.34375ZM10.5 9.03125C9.41269 9.03125 8.53125 9.91269 8.53125 11C8.53125 12.0873 9.41269 12.9688 10.5 12.9688C11.5873 12.9688 12.4688 12.0873 12.4688 11C12.4688 9.91269 11.5873 9.03125 10.5 9.03125ZM7.21875 11C7.21875 9.18782 8.68782 7.71875 10.5 7.71875C12.3122 7.71875 13.7812 9.18782 13.7812 11C13.7812 12.8122 12.3122 14.2812 10.5 14.2812C8.68782 14.2812 7.21875 12.8122 7.21875 11Z"
                      fill="#DCDCDC"
                    />
                  </svg>
                </div>

                <div className="flex flex-row justify-end mb-8">
                  <Link
                    href="/resetpassword"
                    className="text-sm font-medium text-purple-blue-500"
                  >
                    Forget password?
                  </Link>
                </div>
                {error ? (
                  <p className="text-red-500 my-1">{error}</p>
                ) : (
                  <div className="h-[56px]" />
                )}

                <button className="w-full px-6 py-5 bg-[#2E7490] mb-5 text-lg font-bold leading-none text-white rounded-2xl">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <Image
            alt="login visual"
            src={loginImage}
            width={500}
            height={500}
            className="mr-10 w-[620px] h-[620px]"
          />
          <ToastContainer />
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
