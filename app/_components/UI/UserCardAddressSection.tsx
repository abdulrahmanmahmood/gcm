interface IProps {
  street: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

const UserCardAddressSection = ({
  street,
  city,
  zipCode,
  state,
  country,
}: IProps) => {
  return (
    <div className="px-9 pt-5 pb-5 flex-auto bg-transparent">
      <div className="flex flex-col">
        <div className="bg-petrol text-white text-center py-3 rounded-lg mb-4">
          Address
        </div>
        <div className="px-2 pt-5 pb-5 flex-auto bg-transparent">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between w-[50%]">
              <p className="text-petrol font-medium">Street</p>
              <p className="text-[#7D7D7D]">{street}</p>
            </div>
            <div className="flex justify-between w-[50%]">
              <p className="text-petrol font-medium">City</p>
              <p className="text-[#7D7D7D]">{city}</p>
            </div>
            <div className="flex justify-between w-[50%]">
              <p className="text-petrol font-medium">Zip Code</p>
              <p className="text-[#7D7D7D]">{zipCode}</p>
            </div>
            <div className="flex justify-between w-[50%]">
              <p className="text-petrol font-medium">State</p>
              <p className="text-[#7D7D7D]">{state}</p>
            </div>
            <div className="flex justify-between w-[50%]">
              <p className="text-petrol font-medium">Country</p>
              <p className="text-[#7D7D7D]">{country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardAddressSection;
