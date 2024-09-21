"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import Image from "next/image";
// import { fetchSCCompanyData, updateCompanyData } from "@/app/_utils/company";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { fetchSCCompanyData } from "@/app/_utils/company/SuberContainerCompanies/fetchSCCompanyData";
import { useEffect } from "react";
import { updateCompanyData } from "@/app/_utils/company/SuberContainerCompanies/updateCompanyData";
import TitleAddAndEdit from "@/app/_components/UI/TitleAddAndEdit";
import MapImage from "@/public/5462573_direction_google_gps_location_map_icon 1map.png";
import placeholderImage from "../../../../../../public/healthicons_ui-user-profile.png";

const inputStyle = "border p-2 w-full text-black";

const EditCompanyPage = ({ params }: { params: { companyid: string } }) => {
  const companyId = parseInt(params.companyid, 10);
  const router = useRouter();
  console.log("Company Id", companyId);

  // Fetch company data
  const {
    data: companyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companyData", companyId],
    queryFn: () => fetchSCCompanyData(companyId),
    select: (data) => data?.data,
  });
  if (companyData) {
    console.log("companyData", companyData);
  }

  // Form management
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      website: "",
      faxNumber: "",
      industry: "",
      headInfo: {
        headFullName: "",
        headEmail: "",
        headPhoneNumber: "",
      },
      branches: [
        {
          name: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
          location: {
            latitude: "",
            longitude: "",
          },
        },
      ],
    },
  });

  // Field array for branches
  const {
    fields: branchesFields,
    append: addBranch,
    remove: removeBranch,
  } = useFieldArray({
    control,
    name: "branches",
  });

  useEffect(() => {
    if (companyData) {
      reset({
        name: companyData.name || "",
        email: companyData.email || "",
        website: companyData.website || "",
        faxNumber: companyData.faxNumber || "",
        industry: companyData.industry || "",
        headInfo: {
          headFullName: companyData.headInfo?.headFullName || "",
          headEmail: companyData.headInfo?.headEmail || "",
          headPhoneNumber: companyData.headInfo?.headPhoneNumber || "",
        },
        address: {
          street: companyData.address?.street || "",
          city: companyData.address?.city || "",
          state: companyData.address?.state || "",
          zipCode: companyData.address?.zipCode || "",
          country: companyData.address?.country || "",
        },
        branches: companyData.branches.length
          ? companyData.branches.map((branch) => ({
              name: branch.name || "",
              phoneNumber: branch.phoneNumber || "",
              address: {
                street: branch.address?.street || "",
                city: branch.address?.city || "",
                state: branch.address?.state || "",
                zipCode: branch.address?.zipCode || "",
                country: branch.address?.country || "",
              },
              location: {
                latitude: branch.location?.latitude || "",
                longitude: branch.location?.longitude || "",
              },
            }))
          : [
              {
                name: "",
                phoneNumber: "",
                address: {
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                },
                location: {
                  latitude: "",
                  longitude: "",
                },
              },
            ],
      });
    }
  }, [companyData, reset]);

  // Mutation to handle the update request
  const mutation = useMutation({
    mutationFn: (updatedData: any) => updateCompanyData(companyId, updatedData),
    onSuccess: () => {
      toast.success("Company successfully updated!");
      // setTimeout(() => {
      //   router.push("/companymanage/companies");
      // }, 2000);
    },
    onError: (error) => {
      console.error("Error updating company:", error);
      toast.error("Failed to update company.");
    },
  });

  // Form submission handler
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading company data</div>;

  return (
    <div className="container mx-auto p-8 text-petrol">
      <TitleAddAndEdit title="Edit a Company" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Info */}
        <div className="flex flex-col items-center mb-8 text-petrol">
          <Image
            src={companyData?.logoViewUrl || placeholderImage}
            alt={`${companyData?.name} Logo`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4">{companyData?.name}</h2>
        </div>
        {/* General Info */}
        <div className="grid grid-cols-2 gap-6 text-petrol">
          <div>
            <label>Name</label>
            <input type="text" {...register("name")} className={inputStyle} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" {...register("email")} className={inputStyle} />
          </div>
          <div>
            <label>Website</label>
            <input
              type="text"
              {...register("website")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Fax Number</label>
            <input
              type="text"
              {...register("faxNumber")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Industry</label>
            <input
              type="text"
              {...register("industry")}
              className={inputStyle}
            />
          </div>
        </div>
        {/* Head Info */}
        <h3 className="text-xl my-[50px] font-semibold bg-petrol text-white py-3 text-center rounded-lg mb-4">
          Head Information
        </h3>
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div>
            <label>Head Name</label>
            <input
              type="text"
              {...register("headInfo.headFullName")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Head Email</label>
            <input
              type="email"
              {...register("headInfo.headEmail")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Head Phone Number</label>
            <input
              type="text"
              {...register("headInfo.headPhoneNumber")}
              className={inputStyle}
            />
          </div>
        </div>
        {/* Address */}
        <h3 className="text-xl my-8 font-semibold bg-petrol text-white py-3 text-center rounded-lg mb-4">
          Address
        </h3>{" "}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div>
            <label>Street</label>
            <input
              type="text"
              {...register("address.street")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              {...register("address.city")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              {...register("address.state")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              {...register("address.zipCode")}
              className={inputStyle}
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              {...register("address.country")}
              className={inputStyle}
            />
          </div>
        </div>
        {/* Branches */}
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-petrol text-2xl text-center font-semibold my-8 justify-center">
            Business count
          </h2>
          <button
            className="bg-petrol w-[150px] max-h-[50px] px-4 py-2 text-white rounded-lg justify-end"
            type="button"
            onClick={() =>
              addBranch({
                name: "",
                phoneNumber: "",
                address: {
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "",
                },
                location: {
                  latitude: "",
                  longitude: "",
                },
              })
            }
          >
            + Add New
          </button>
        </div>
        {/* Display Branch Titles and Inputs */}
        {branchesFields.length > 0 &&
          branchesFields.map((branch, index) => (
            <div key={branch.id}>
              {/* Dynamic Title for Each Branch */}
              <h3 className="text-xl text-center text-white py-3 rounded-lg bg-petrol font-semibold mt-8 mb-4">
                {index === 0
                  ? "First Branch"
                  : index === 1
                  ? "Second Branch"
                  : `Branch ${index + 1}`}
              </h3>

              <div className="w-full text-end flex justify-end px-10">
                <button
                  type="button"
                  onClick={() => removeBranch(index)}
                  className="text-redd bg-[#F5F7FB] w-[200px] my-5 ml-0 max-h-[50px] px-4 py-2 text-nowrap flex items-center justify-center space-x-2"
                >
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                      fill="#C32B43"
                    />
                  </svg>
                  <span>Remove Branch</span>
                </button>
              </div>

              <div className="border p-4 mb-4 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label>Name</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.name`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.phoneNumber`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Street</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.address.street`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.address.city`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>State</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.address.state`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Zip Code</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.address.zipCode`)}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.address.country`)}
                      className="border p-2 w-full"
                    />
                  </div>
                </div>
                <Image
                  src={MapImage}
                  alt="google map"
                  sizes="200px"
                  className="mx-auto my-10"
                />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700">latitude</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.location.latitude`)}
                      className="border rounded-lg w-full px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">longitude</label>
                    <input
                      type="text"
                      {...register(`branches.${index}.location.longitude`)}
                      className="border rounded-lg w-full px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {/* Submit Button */}
        <div className="w-[80%] mx-auto my-13 px-10">
          <button
            type="submit"
            className="text-xl font-bold px-6 py-3 bg-petrol text-white rounded-lg my-10 w-full"
          >
            Save Changes
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditCompanyPage;
