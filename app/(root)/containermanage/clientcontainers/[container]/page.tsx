import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import Link from "next/link";
import React from "react";

const page = () => {
  const staticViewContainer = {
    id: 4332423,
    wasteType: "Excavated Material",
    status: "Active",
    volumeValue: "1000",
    weightValue: "1000",
    location: "Location 1",
    createdDate: "2022-01-01",
    modifiedDate: "2022-01-01",
  };
  return (
    <div className="p-5 ">
      <div className="flex flex-row justify-between">
        <TitleAddAndEdit title="View Containers" />
        <Link
          href={`/containermanage/clientcontainers/edit/${staticViewContainer.id}`}
        >
          <button className="flex items-center justify-center space-x-2 bg-petrol w-[160px] py-3 px-2 rounded-lg text-white">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2058_6753)">
                <path
                  d="M2.26933 15.3842H11.5001C12.0722 15.3825 12.6203 15.154 13.0241 14.7487C13.4279 14.3434 13.6544 13.7944 13.6539 13.2223V8.58416C13.6539 8.42095 13.5891 8.26443 13.4737 8.14902C13.3583 8.03362 13.2018 7.96878 13.0386 7.96878C12.8753 7.96878 12.7188 8.03362 12.6034 8.14902C12.488 8.26443 12.4232 8.42095 12.4232 8.58416V13.2223C12.424 13.4681 12.3273 13.7042 12.1542 13.8788C11.9811 14.0533 11.7459 14.1521 11.5001 14.1534H2.26933C2.02352 14.1521 1.78828 14.0533 1.61522 13.8788C1.44216 13.7042 1.34543 13.4681 1.34625 13.2223V4.00755C1.34543 3.76175 1.44216 3.52566 1.61522 3.3511C1.78828 3.17654 2.02352 3.07778 2.26933 3.07647H6.88471C7.04792 3.07647 7.20445 3.01164 7.31985 2.89623C7.43526 2.78082 7.50009 2.6243 7.50009 2.46109C7.50009 2.29788 7.43526 2.14135 7.31985 2.02595C7.20445 1.91054 7.04792 1.8457 6.88471 1.8457H2.26933C1.6972 1.84733 1.1491 2.07588 0.745299 2.48118C0.341498 2.88648 0.114988 3.43543 0.115479 4.00755V13.2223C0.114988 13.7944 0.341498 14.3434 0.745299 14.7487C1.1491 15.154 1.6972 15.3825 2.26933 15.3842Z"
                  fill="white"
                />
                <path
                  d="M5.93397 7.10338L5.44843 9.32738C5.42645 9.42826 5.43021 9.53304 5.45935 9.63209C5.4885 9.73113 5.54209 9.82125 5.6152 9.89415C5.68932 9.96522 5.77947 10.0174 5.87802 10.0462C5.97658 10.075 6.08063 10.0796 6.18135 10.0597L8.40043 9.57292C8.51565 9.54762 8.62118 9.48973 8.70443 9.40615L14.313 3.79754C14.4845 3.6261 14.6205 3.42257 14.7133 3.19856C14.8061 2.97456 14.8539 2.73446 14.8539 2.492C14.8539 2.24953 14.8061 2.00944 14.7133 1.78543C14.6205 1.56143 14.4845 1.35789 14.313 1.18646C13.9615 0.850543 13.494 0.663086 13.0078 0.663086C12.5216 0.663086 12.0541 0.850543 11.7026 1.18646L6.10258 6.80061C6.01854 6.8833 5.96001 6.98839 5.93397 7.10338ZM12.5727 2.05723C12.6898 1.94507 12.8457 1.88246 13.0078 1.88246C13.1699 1.88246 13.3258 1.94507 13.4429 2.05723C13.5567 2.17331 13.6205 2.32941 13.6205 2.492C13.6205 2.65459 13.5567 2.81069 13.4429 2.92677L13.0078 3.36184L12.1377 2.49169L12.5727 2.05723ZM7.09582 7.54277L11.2644 3.36369L12.126 4.22954L7.95551 8.40984L6.85089 8.65231L7.09582 7.54277Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2058_6753">
                  <rect
                    width="14.7692"
                    height="14.7692"
                    fill="white"
                    transform="translate(0.115479 0.615234)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Edit</span>
          </button>
        </Link>
      </div>{" "}
      <div className="border-2 mx-2 my-12 p-5 rounded-lg shadow-md">
        <div className="flex flex-col space-y-9">
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">ID</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.id}</p>{" "}
            {/* Convert phone to string */}
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">Waste Type</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.wasteType}</p>
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">Status</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.status}</p>
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">Volume Value</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.volumeValue}</p>
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">Weight value</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.weightValue}</p>
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">location</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.location}</p>
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">CreatedDate</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.createdDate}</p>
            {/* <p className="text-[#7D7D7D]">{CreatedFormattedDate}</p> */}
          </div>
          <div className="flex justify-between w-[50%]">
            <p className="text-petrol font-medium">ModifiedDate</p>
            <p className="text-[#7D7D7D]">{staticViewContainer.modifiedDate}</p>
            {/* <p className="text-[#7D7D7D]">{modifiedFormattedDate}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
