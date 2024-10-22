import Welcome from "@/app/_components/UI/Welcome";
import React from "react";
import { GiTruck } from "react-icons/gi";
import { GrVmMaintenance } from "react-icons/gr";

const page = () => {
  return (
    <div className="flex flex-wrap">
      <Welcome
        title="Vehicles"
        text1="Total cost ,Remain cost"
        text2="Start date"
        url="vehicle-management/vehicles"
        icon={
          <GiTruck className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
      <Welcome
        title="Vehicle Maintenance"
        text1="Assign and modify user roles and "
        text2="maintenance."
        url="maintenance/vehicle"
        icon={
          <GrVmMaintenance className="text-petrol text-[100px] text-center mx-auto" />
        }
      />
    </div>
  );
};

export default page;
