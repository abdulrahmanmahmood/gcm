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
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 border-[#DCDCDC] border-[1px] text-dark-grey-900 rounded-2xl"
                  onChange={handleChange}
                />

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
