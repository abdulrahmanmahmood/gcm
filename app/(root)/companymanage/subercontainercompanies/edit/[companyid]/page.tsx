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
      setTimeout(() => {
        router.push("/companymanage/companies");
      }, 2000);
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Edit a Company</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Company Info */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={companyData?.logoViewUrl || "/placeholder-logo.png"}
            alt={`${companyData?.name} Logo`}
            width={150}
            height={150}
            className="rounded-full object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4">{companyData?.name}</h2>
        </div>

        {/* General Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register("name")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Website</label>
            <input
              type="text"
              {...register("website")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Fax Number</label>
            <input
              type="text"
              {...register("faxNumber")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Industry</label>
            <input
              type="text"
              {...register("industry")}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Head Info */}
        <h3 className="text-xl font-semibold mt-8 mb-4">Head Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Head Name</label>
            <input
              type="text"
              {...register("headInfo.headFullName")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Head Email</label>
            <input
              type="email"
              {...register("headInfo.headEmail")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Head Phone Number</label>
            <input
              type="text"
              {...register("headInfo.headPhoneNumber")}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Address */}
        <h3 className="text-xl font-semibold mt-8 mb-4">Address</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Street</label>
            <input
              type="text"
              {...register("address.street")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              {...register("address.city")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              {...register("address.state")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              {...register("address.zipCode")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              {...register("address.country")}
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* Branches */}
        <h3 className="text-xl font-semibold mt-8 mb-4">Branches</h3>
        {branchesFields.map((branch, index) => (
          <div key={branch.id} className="border p-4 mb-4 rounded-lg">
            <h4 className="text-lg font-bold mb-2">Branch {index + 1}</h4>
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
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => removeBranch(index)}
                  className="text-red-500 underline"
                >
                  Remove Branch
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
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
          className="text-blue-500 underline"
        >
          Add Branch
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded-lg"
        >
          Save Changes
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditCompanyPage;
