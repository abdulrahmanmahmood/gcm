import React from "react";
interface Iprops {
  Name: string;
  total: number;
  remain: number;
  location: string;
  startDate: string;
  endDate: string;
  createdDate: string;
  modifiedDate: string;
}

const ViewProjectDetCard = ({
  Name,
  createdDate,
  endDate,
  location,
  modifiedDate,
  remain,
  startDate,
  total,
}: Iprops) => {
  return (
    <div className="px-9 py-10 pt-5 pb-5 flex-auto bg-transparent border-y-2 w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Project Name</p>
          <p className="text-[#7D7D7D]">{Name}</p>{" "}
          {/* Convert phone to string */}
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Total Cost</p>
          <p className="text-[#7D7D7D]">${total}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Remain Cost</p>
          <p className="text-[#7D7D7D]">${remain}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Location</p>
          <p className="text-[#7D7D7D]">location 1</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Start Date</p>
          <p className="text-[#7D7D7D]">{startDate}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">End Date</p>
          <p className="text-[#7D7D7D]">{endDate}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">CreatedDate</p>
          <p className="text-[#7D7D7D]">{createdDate}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">ModifiedDate</p>
          <p className="text-[#7D7D7D]">{modifiedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetCard;
