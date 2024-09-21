import React from "react";
interface IProps {
  email?: string; // Allow both string and number types for email
  faxNumber?: string | undefined | null;
  headName?: string;
  headEmail?: string;
  headPhoneNumber?: string;
  createdDate?: string;
  modifiedDate?: string | null;
}

const CCDetailsSection = ({
  email = "N/A", // Fallback to "N/A" if email is undefined
  faxNumber = "N/A", // Fallback to 0 if faxNumber is undefined
  headName = "N/A", // Fallback to "N/A" if headName is undefined
  headEmail = "N/A",
  headPhoneNumber = "N/A",
  createdDate = "N/A",
  modifiedDate = "N/A", // Fallback to "N/A" if modifiedDate is undefined
}: IProps) => {
  const modifiedFormattedDate = new Date(modifiedDate).toLocaleDateString(
    "en-GB"
  );
  const CreatedFormattedDate = new Date(createdDate).toLocaleDateString(
    "en-GB"
  );

  return (
    <div className="px-9 pt-5 pb-5 flex-auto bg-transparent">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Email</p>
          <p className="text-[#7D7D7D]">{email?.toString()}</p>{" "}
          {/* Convert phone to string */}
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Fax Number</p>
          <p className="text-[#7D7D7D]">${faxNumber}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">HeadName</p>
          <p className="text-[#7D7D7D]">{headName}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Head Email</p>
          <p className="text-[#7D7D7D]">{headEmail}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Head Phone Number</p>
          <p className="text-[#7D7D7D]">{headPhoneNumber}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">CreatedDate</p>
          <p className="text-[#7D7D7D]">{CreatedFormattedDate}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">ModifiedDate</p>
          <p className="text-[#7D7D7D]">{modifiedFormattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default CCDetailsSection;
