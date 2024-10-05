"use client";
import React, { useState, useEffect, ReactNode, useRef } from "react";
import { RiWifiOffLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InternetConnectionServiceProps {
  children: ReactNode;
}

const InternetConnectionService: React.FC<InternetConnectionServiceProps> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true); // Default to true since SSR can't access navigator
  const offlineToastId = useRef<number | string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine); // Safely set initial online status

      const handleOnline = () => {
        setIsOnline(true);

        if (offlineToastId.current !== null) {
          toast.dismiss(offlineToastId.current);
          offlineToastId.current = null;
        }

        toast.success("You are back online!", {
          autoClose: 3000, // Auto close after 3 seconds
        });
      };

      const handleOffline = () => {
        setIsOnline(false);

        // Show a persistent offline warning toast
        offlineToastId.current = toast.warning(
          <div className="flex items-center">
            <span>You are offline!</span>
            <RiWifiOffLine className="text-xl text-red-800 mx-5" />
          </div>,
          {
            autoClose: false, // Keep the toast visible until online
            position: "top-center",
          }
        );
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // Initial check if the user is offline when the component mounts
      if (!navigator.onLine) {
        handleOffline();
      }

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default InternetConnectionService;
