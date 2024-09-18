interface IProps {
  phone?: string | number; // Allow both string and number types for phone
  salary?: number;
  birthDate?: string;
  createdDate: string;
  modifiedDate?: string;
}

const UserCardDetailsSection = ({
  phone = "N/A", // Fallback to "N/A" if phone is undefined
  salary = 0, // Fallback to 0 if salary is undefined
  birthDate = "N/A", // Fallback to "N/A" if birthDate is undefined
  createdDate,
  modifiedDate = "N/A", // Fallback to "N/A" if modifiedDate is undefined
}: IProps) => {
  return (
    <div className="px-9 my-10 py-5 pb-5 flex-auto bg-transparent">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Phone Number</p>
          <p className="text-[#7D7D7D]">{phone?.toString()}</p>{" "}
          {/* Convert phone to string */}
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">Salary</p>
          <p className="text-[#7D7D7D]">${salary.toLocaleString()}</p>
        </div>
        <div className="flex justify-between w-[50%]">
          <p className="text-petrol font-medium">BirthDate</p>
          <p className="text-[#7D7D7D]">{birthDate}</p>
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

export default UserCardDetailsSection;
