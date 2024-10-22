"use client";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateEntity } from "@/app/_utils/general/Update";
import { fetchOneData } from "@/app/_utils/general/FetchOneData";

const Page = ({ params }: { params: { maintenance: string } }) => {
  const maintenanceId = parseInt(params.maintenance, 10);
  const router = useRouter();

  // Form state
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [finishDateTime, setFinishDateTime] = useState<string>("");
  const [inCharge, setInCharge] = useState<string>("");

  // Fetch maintenance data
  const { data, error, isLoading } = useQuery({
    queryKey: ["viewMaintenance", maintenanceId],
    queryFn: () =>
      fetchOneData(
        `management/vehicle/maintenance`,
        maintenanceId,
        "Fetch Maintenance Data"
      ),
    select: (data: any) => data.data,
  });

  useEffect(() => {
    if (data) {
      // Populate the form fields with the fetched data
      setScheduleDate(data.scheduleDate);
      setDescription(data.description);
      setStatus(data.status);
      setFinishDateTime(data.finishDateTime?.split(".")[0] || ""); // Remove milliseconds
      setInCharge(data.inCharge);
    }

    if (error) {
      console.error("Error fetching maintenance data:", error);
      toast.error("Failed to load maintenance data");
    }
  }, [data, error]);

  // Mutation for updating maintenance
  const mutation = useMutation({
    mutationFn: (updatedData) =>
      updateEntity(
        `management/vehicle/maintenance/${maintenanceId}/update`,
        updatedData
      ),
    onSuccess: () => {
      toast.success("Maintenance record updated successfully!");
      // setTimeout(() => {
      //   router.push("/maintenance"); // Uncomment to enable redirect
      // }, 2000);
    },
    onError: (error) => {
      console.error("Error updating maintenance:", error);
      toast.error("Failed to update maintenance record.");
    },
  });

  // Handle save action
  const handleSave = () => {
    mutation.mutate({
      scheduleDate,
      description,
      status,
      finishDateTime,
      inCharge,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading maintenance data.</div>;

  return (
    <div className="w-[80%] px-7 mx-auto p-5">
      <TitleAddAndEdit title="Edit Vehicle Maintenance" />

      <form className="space-y-6 mt-8">
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="bg-petrol text-white rounded-md px-6 py-2 hover:bg-petrol-dark focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-opacity-50 w-40"
          >
            Save
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Schedule Date Field */}
          <div className="flex flex-col">
            <label
              htmlFor="scheduleDate"
              className="text-petrol font-semibold mb-1"
            >
              Schedule Date
            </label>
            <input
              id="scheduleDate"
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            />
          </div>

          {/* Status Field */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-petrol font-semibold mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            >
              <option value="">Select Status</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">cancelled</option>
            </select>
          </div>

          {/* Finish DateTime Field */}
          <div className="flex flex-col">
            <label
              htmlFor="finishDateTime"
              className="text-petrol font-semibold mb-1"
            >
              Finish Date & Time
            </label>
            <input
              id="finishDateTime"
              type="datetime-local"
              value={finishDateTime}
              onChange={(e) => setFinishDateTime(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            />
          </div>

          {/* In Charge Field */}
          <div className="flex flex-col">
            <label
              htmlFor="inCharge"
              className="text-petrol font-semibold mb-1"
            >
              In Charge
            </label>
            <input
              id="inCharge"
              type="text"
              value={inCharge}
              onChange={(e) => setInCharge(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
              placeholder="Enter person in charge"
            />
          </div>
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-petrol font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:border-petrol focus:ring-petrol"
            placeholder="Enter maintenance description"
            rows={4}
          />
        </div>
      </form>
    </div>
  );
};

export default Page;
