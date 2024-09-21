import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import React from "react";

const page = ({ params }: { params: { container: string } }) => {
  const containerId = parseInt(params.container, 10); // Convert the container ID from string to number

  return (
    <div className="p-5">
      <div className="flex flex-row justify-between">
        <TitleAddAndEdit title="Edit a  Containers" />
        <div>
          <button className="flex items-center justify-center space-x-2 bg-petrol text-2xl font-semibold w-[160px] py-3 px-2 rounded-lg text-white">
            Save{" "}
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default page;
