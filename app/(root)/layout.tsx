// "use client";
import Image from "next/image";
import Drawer from "../_components/Drawer";
import logo from "../../public/logo.jpg";
import Navbar from "../_components/Navbar";
import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  const name = getCookie("UserName", { cookies });

  // const name = getCookie("UserName");
  const token = getCookie("token", { cookies });

  // if (token == null) {
  //   router.push("/login");
  // }

  console.log("cookeis in root layout", name, token);

  return (
    <div className=" flex flex-row overflow-auto">
      {/* LEFT */}
      <div className="lg:w-[18%] md:w-[15%] bg-white flex-col pt-[20px] h-full overflow-hidden">
        <Image
          src={logo}
          alt="drawer logo"
          width={200}
          height={200}
          className="mx-auto hidden lg:block "
        />
        <Drawer />
      </div>
      {/* RIGHT */}
      <div className="w-[100%] lg:w-[82%] md:w-[85%] overflow-hidden pb-3">
        <Navbar
          email="ahmedmohamedabdellhady@gmail.com"
          name={`${name ? name : null}`}
          image={logo}
        />
        {children}
      </div>
    </div>
  );
}
