"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import addTrip, {
  IDeliveryNoteInput,
  IRecycleReceiptInput,
} from "@/app/_utils/company/trips/AddTrip";

const AddTripPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [manifestFile, setManifestFile] = useState<File | null>(null);
  const [deliveryNoteFile, setDeliveryNoteFile] = useState<File | null>(null);
  const [recycleReceiptFile, setRecycleReceiptFile] = useState<File | null>(
    null
  );

  const mutation = useMutation({
    mutationFn: (params: {
      deliveryNoteData: IDeliveryNoteInput;
      recycleReceiptData: IRecycleReceiptInput;
      manifestFile: File | null;
      deliveryNoteFile: File | null;
      recycleReceiptFile: File | null;
    }) =>
      addTrip(
        params.deliveryNoteData,
        params.recycleReceiptData,
        params.manifestFile,
        params.deliveryNoteFile,
        params.recycleReceiptFile
      ),
    onSuccess: (data: any) => {
      toast.success("Trip successfully added!");
      console.log("Trip successfully added", data);
      router.push("/trips");
    },
    onError: (error: any) => {
      console.error("Error adding trip:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to add trip. Please try again."
      );
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const onSubmit = (data: any) => {
    const deliveryNoteData: IDeliveryNoteInput = {
      employeeId: data.employeeId,
      vehicleId: data.vehicleId,
      projectId: data.projectId,
      vehiclePermitId: data.vehiclePermitId,
      removalDate: data.removalDate,
      wasteTypes: data.wasteTypes?.split(",") || [],
      otherWasteType: data.otherWasteType,
      description: data.description,
      weight: {
        value: data.weightValue,
        unit: data.weightUnit,
      },
      disposalMethodType: data.disposalMethodType,
      skipColorCode: data.skipColorCode,
    };

    const recycleReceiptData: IRecycleReceiptInput = {
      companyId: data.companyId,
      designation: data.designation,
      recycleDate: data.recycleDate,
      wasteTypes: data.recycleWasteTypes?.split(",") || [],
      otherWasteType: data.recycleOtherWasteType,
      vehicleNo: data.vehicleNo,
      weight: {
        value: data.recycleWeightValue,
        unit: data.recycleWeightUnit,
      },
    };

    mutation.mutate({
      deliveryNoteData,
      recycleReceiptData,
      manifestFile,
      deliveryNoteFile,
      recycleReceiptFile,
    });
  };

  return (
    <div className="h-full w-full overflow-x-auto">
      <TitleAddAndEdit title="Create Trip" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-6"
      >
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-2xl border-stone-200 bg-light/30 p-6">
          {/* Delivery Note Section */}
          <div className=" bg-white shadow-xl border-2 rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-extrabold text-petrol text-center my-5">
              Delivery Note Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <label className="block text-petrol">Employee ID *</label>
                <input
                  type="text"
                  {...register("employeeId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.employeeId && (
                  <p className="text-red-500">Employee ID is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Vehicle ID *</label>
                <input
                  type="text"
                  {...register("vehicleId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.vehicleId && (
                  <p className="text-red-500">Vehicle ID is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Project ID *</label>
                <input
                  type="text"
                  {...register("projectId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.projectId && (
                  <p className="text-red-500">Project ID is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Removal Date *</label>
                <input
                  type="date"
                  {...register("removalDate", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.removalDate && (
                  <p className="text-red-500">Removal Date is required</p>
                )}
              </div>

              {/* Weight Information */}
              <div>
                <label className="block text-petrol">Weight Value *</label>
                <input
                  type="number"
                  {...register("weightValue", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-petrol">Weight Unit *</label>
                <select
                  {...register("weightUnit", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="KG">KG</option>
                  <option value="TON">TON</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-petrol">Manifest File</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setManifestFile)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-petrol">Delivery Note File</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setDeliveryNoteFile)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="my-[50px]">
              <h2 className="text-3xl font-extrabold text-petrol text-center my-10">
                Recycle Receipt Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-petrol">Company ID *</label>
                  <input
                    type="text"
                    {...register("companyId", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-petrol">Designation *</label>
                  <input
                    type="text"
                    {...register("designation", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-petrol">Recycle Date *</label>
                  <input
                    type="date"
                    {...register("recycleDate", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-petrol">Vehicle Number *</label>
                  <input
                    type="text"
                    {...register("vehicleNo", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-petrol">
                    Recycle Receipt File
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, setRecycleReceiptFile)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recycle Receipt Section */}

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <button
              type="button"
              className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              onClick={() => router.push("/trips")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-petrol text-white rounded-lg"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Add Trip"}
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTripPage;
