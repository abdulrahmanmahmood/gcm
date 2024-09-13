"use client"; // This ensures the component runs in the browser (client-side)

import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = getCookie("token") as string | null;
    setToken(tokenFromCookie);

    if (!tokenFromCookie) {
      console.log("Token not found, redirecting...");
      // Uncomment this to actually redirect
      redirect("/login");
    } else {
      console.log("Token found:", tokenFromCookie);
    }
  }, []);

  return <div>Home page</div>;
}

export default Page;
