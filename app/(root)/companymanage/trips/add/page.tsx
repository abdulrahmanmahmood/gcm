"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import addTrip, {
  IDeliveryNoteInput,
  IRecycleReceiptInput,
} from "@/app/_utils/company/trips/AddTrip";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import { getCookie } from "cookies-next";
import { ClientContract, Company, Project } from "@/app/_interfaces";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });
import { MultiValue, ActionMeta } from "react-select";

interface WasteTypeOption {
  value: string;
  label: string;
}
const wasteTypeOptions: WasteTypeOption[] = [
  { value: "PAPER", label: "Paper" },
  { value: "CARDBOARD", label: "Cardboard" },
  { value: "WOOD", label: "Wood" },
  { value: "PLASTIC", label: "Plastic" },
  { value: "METAL_STEEL", label: "Metal / Steel" },
  { value: "CONCRETE", label: "Concrete" },
  { value: "FOOD_WASTE", label: "Food Waste" },
  { value: "GENERAL_WASTE", label: "General Waste" },
  { value: "ASPHALT", label: "Asphalt" },
  { value: "GLASS", label: "Glass" },
  { value: "EXCAVATED_MATERIAL", label: "Excavated Material" },
  { value: "NON_HAZARDOUS_ELECTRONIC", label: "Electronic" },
  { value: "OILS_FUELS_OILY_WATER", label: "Oils / Fuels / Oily Water" },
  { value: "TIRES", label: "Tires" },
  { value: "CONCRETE_WASH_WATER", label: "Concrete Wash Water" },
  { value: "SEWAGE", label: "Sewage" },
  { value: "CONTAMINATED_MATERIAL", label: "Contaminated Material" },
  { value: "CONTAMINATED_SOIL", label: "Contaminated Soil" },
  { value: "RAGS_DRUMS_FILTERS", label: "Rags / Drums / Filters" },
  { value: "BATTERIES", label: "Batteries" },
  { value: "ASBESTOS", label: "Asbestos" },
  { value: "MEDICAL", label: "Medical" },
  { value: "HAZARDOUS_ELECTRONIC", label: "Electronic (Hazardous)" },
  { value: "OTHER", label: "Other" },
];

const AddTripPage = () => {
  const token = getCookie("token");

  const {
    data: VehicleData,
    isLoading: loadingVehicle,
    isError: vehicleError,
    error,
  } = useQuery({
    queryKey: ["VehicleData"],
    queryFn: () =>
      FetchAllData(
        "management/vehicle/all", // Endpoint
        0, // Page number
        100, // Page size, assuming you want to fetch all available employees
        "", // No search keyword
        {}, // No filters
        ["ID_ASC"], // Sorting order
        "VehicleData"
      ),
  });

  const {
    data: EmployeeData,
    isLoading: loadingEmployee,
    isError: isEmployeeError,
    error: EmployeeErrr,
  } = useQuery({
    queryKey: ["EmployeeeData"],
    queryFn: () =>
      FetchAllData(
        "management/user/employee/all", // Endpoint
        0, // Page number
        100, // Page size, assuming you want to fetch all available employees
        "", // No search keyword
        {}, // No filters
        ["ID_ASC"], // Sorting order
        "EmployeeData"
      ),
  });
  const {
    data: ProjectsData,
    isLoading: loadingProjects,
    isError: isProjectsError,
    error: ProjectsErorr,
  } = useQuery({
    queryKey: ["ProjectsData"],
    queryFn: () =>
      FetchAllData(
        "management/project/all", // Endpoint
        0, // Page number
        100, // Page size, assuming you want to fetch all available employees
        "", // No search keyword
        {}, // No filters
        ["ID_ASC"], // Sorting order
        "ProjectsData"
      ),
  });

  const {
    data: SubCompanyData,
    isLoading: loadingSubCompany,
    isError: isSubCompanyError,
    error: SubCompaniesErorr,
  } = useQuery({
    queryKey: ["SubCompaniesData"],
    queryFn: () =>
      FetchAllData(
        "management/company/subcontractor/all", // Endpoint
        0, // Page number
        100, // Page size, assuming you want to fetch all available employees
        "", // No search keyword
        {}, // No filters
        ["ID_ASC"], // Sorting order
        "SubCompaniesData"
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
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
      reset();
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
      wasteTypes: getValues("wasteTypes"), // Retrieve the selected waste types
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
      wasteTypes: getValues("RecycleWasteTypes"), // Retrieve the selected waste types
      otherWasteType: data.recycleOtherWasteType,
      vehicleNo: data.vehicleNo,
      weight: {
        value: data.RecycleWeightValue,
        unit: data.RecycleWeightUnit,
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
  const handleDeliveryChange = (
    newValue: unknown,
    _actionMeta: ActionMeta<unknown>
  ): void => {
    const selectedOptions = newValue as MultiValue<WasteTypeOption>; // Type assertion
    const values = selectedOptions.map((option) => option.value);
    setValue("wasteTypes", values);
  };
  const handleRecycleChange = (
    newValue: unknown,
    _actionMeta: ActionMeta<unknown>
  ): void => {
    const selectedOptions = newValue as MultiValue<WasteTypeOption>; // Type assertion
    const values = selectedOptions.map((option) => option.value);
    setValue("RecycleWasteTypes", values);
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
                <select
                  {...register("employeeId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a employee</option>
                  {EmployeeData?.content.map((employee: any) => (
                    <option key={employee.id} value={employee.id}>
                      {`${employee.fullName} `}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <p className="text-red-500">Employee ID is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Vehicle *</label>
                <select
                  {...register("vehicleId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a vehicle</option>
                  {VehicleData?.content.map((vehicle: any) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {`${vehicle.manufacturer} - ${vehicle.licensePlate}`}
                    </option>
                  ))}
                </select>
                {errors.vehicleId && (
                  <p className="text-red-500">Vehicle ID is required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Project *</label>
                <select
                  {...register("projectId", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a vehicle</option>
                  {ProjectsData?.content.map((project: Project) => (
                    <option key={project.id} value={project.id}>
                      {`${project.name}`}
                    </option>
                  ))}
                </select>
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
              <div>
                <label className="block text-petrol mb-2">Waste Types *</label>
                <Select
                  options={wasteTypeOptions}
                  placeholder="Select waste type"
                  isMulti
                  isSearchable
                  onChange={handleDeliveryChange} // Adjusted handler
                  className="w-full"
                />
                {errors.wasteTypes && (
                  <p className="text-red-500 mt-2">Waste types are required</p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Description *</label>
                <input
                  type="text"
                  {...register("description", { required: true })}
                  // placeholder="Enter waste types, separated by commas"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.description && (
                  <p className="text-red-500">Description is required</p>
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
                  <option value="KILOGRAMS">KILOGRAMS</option>
                  <option value="TON">TON</option>
                  <option value="POUNDS">POUNDS</option>
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
              <div>
                <label className="block text-petrol">Disposal Method *</label>
                <select
                  {...register("disposalMethodType", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a disposal method</option>
                  <option value="LANDFILL">Landfill</option>
                  <option value="INCINERATION">Incineration</option>
                  <option value="RECYCLING">Recycling</option>
                  <option value="COMPOSTING">Composting</option>
                  <option value="BIOGAS_PRODUCTION">Biogas Production</option>
                  <option value="REUSE">Reuse</option>
                  <option value="HAZARDOUS_WASTE_TREATMENT">
                    Hazardous Waste Treatment
                  </option>
                  <option value="ELECTRONIC_WASTE_DISPOSAL">
                    Electronic Waste Disposal
                  </option>
                  <option value="CHEMICAL_TREATMENT">Chemical Treatment</option>
                  <option value="THERMAL_DESTRUCTION">
                    Thermal Destruction
                  </option>
                  <option value="OCEAN_DISPOSAL">Ocean Disposal</option>
                  <option value="DONATION">Donation</option>
                </select>
                {errors.disposalMethodType && (
                  <p className="text-red-500">
                    Disposal Method Type is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-petrol">Skip Color Code *</label>
                <select
                  {...register("skipColorCode", { required: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select a skip color code</option>
                  <option value="DESIGNATED_YARD">Designated Yard</option>
                  <option value="WHITE_PAPER">White (Paper) - Beige</option>
                  <option value="CARDBOARD">Cardboard - Brown</option>
                  <option value="WOOD">Wood - Light Blue</option>
                  <option value="PLASTIC">Plastic - Grey</option>
                  <option value="METAL_SCRAP">Metal Scrap - Red</option>
                  <option value="HAZARDOUS">Hazardous - Black</option>
                  <option value="GENERAL">General - Green</option>
                  <option value="FOOD">Food - Yellow</option>
                  <option value="CONCRETE">Concrete - Light</option>
                  <option value="GLASS">Glass - Green</option>
                </select>
                {errors.skipColorCode && (
                  <p className="text-red-500">Skip Color Code is required</p>
                )}
              </div>
            </div>
            {/* Recycle Receipt Section */}

            <div className="my-[50px]">
              <h2 className="text-3xl font-extrabold text-petrol text-center my-10">
                Recycle Receipt Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-petrol">Company *</label>
                  <select
                    {...register("companyId", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select a company</option>
                    {SubCompanyData?.content.map((company: Company) => (
                      <option key={company.id} value={company.id}>
                        {`${company.name} `}
                      </option>
                    ))}
                  </select>
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

                {/* gsdfgdfsg */}
                <div>
                  <label className="block text-petrol">Waste Types *</label>
                  <Select
                    options={wasteTypeOptions}
                    placeholder="Select waste type"
                    isMulti
                    isSearchable
                    onChange={handleRecycleChange} // Adjusted handler
                    className="w-full"
                  />
                  {errors.wasteTypes && (
                    <p className="text-red-500">Waste types are required</p>
                  )}
                </div>

                <div>
                  <label className="block text-petrol">Vehicle Number *</label>
                  <input
                    type="text"
                    {...register("vehicleNo", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Weight Information */}
                <div>
                  <label className="block text-petrol">Weight Value *</label>
                  <input
                    type="number"
                    {...register("RecycleWeightValue", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-petrol">Weight Unit *</label>
                  <select
                    {...register("RecycleWeightUnit", { required: true })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="KILOGRAMS">KILOGRAMS</option>
                    <option value="TON">TON</option>
                    <option value="POUNDS">POUNDS</option>
                  </select>
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
