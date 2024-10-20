import Welcome from "@/app/_components/UI/Welcome";
import React from "react";
import { GrHostMaintenance } from "react-icons/gr";
import { GrVmMaintenance } from "react-icons/gr";

const page = () => {
  return (
    <div>
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
