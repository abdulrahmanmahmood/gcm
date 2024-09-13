"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  fetchSCCompanyData,
  ICompany,
} from "@/app/_utils/company/SuberContainerCompanies/fetchSCCompanyData";
import { CompanyAxiosResponse } from "@/app/_interfaces";
import CompanyViewCardHeader from "@/app/_components/UI/Compaines/CompanyViewCardHeader";
import CCDetailsSection from "@/app/_components/UI/Compaines/CCDetailsSection";
import UserCardAddressSection from "@/app/_components/UI/UserCardAddressSection";

const CompanyProfilePage = ({ params }: { params: { companyid: number } }) => {
  const companyId = params.companyid;

  // Fetch company data using react-query
  const {
    data: companyData,
    isLoading,
    error,
  } = useQuery<CompanyAxiosResponse>({
    queryKey: ["companyData", companyId],
    queryFn: () => fetchSCCompanyData(companyId),
    select: (data) => data?.data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading company data.</div>;

  return (
    <div className="container mx-auto p-8 min-h-screen overflow-y-auto pb-20">
      <CompanyViewCardHeader
        type={companyData.type}
        email=""
        enabled
        industry={companyData.industry}
        id={companyData.id}
        url={`/companymanage/subercontainercompanies/edit/${companyData.id}`}
        name={companyData.name}
        locked
        website={companyData?.website ?? "not having website"}
        status={companyData.status}
      />
      {/* Company Information */}

      <CCDetailsSection
        createdDate={companyData.createdDate}
        headPhoneNumber={companyData.headInfo?.phoneNumber}
        email={companyData.email}
        faxNumber={companyData.faxNumber}
        headEmail={companyData.headInfo?.email}
        headName={companyData.headInfo?.name}
        modifiedDate={companyData.modifiedDate}
      />
      <UserCardAddressSection
        city={companyData?.address?.city || "N/A"}
        country={companyData?.address?.country || "N/A"}
        state={companyData?.address?.state || "N/A"}
        street={companyData?.address?.street || "N/A"}
        zipCode={companyData?.address?.zipCode || "N/A"}
      />

      {/* Branches Section */}
      {companyData?.branches?.length ? (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Branches count</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyData?.branches.map((branch, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold">{branch.name}</h3>
                <p>
                  <strong>Phone Number:</strong> {branch.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {branch.address}
                </p>
                <a
                  href={branch.locationUrl}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Location {index + 1}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-8">No branches available for this company.</p>
      )}
    </div>
  );
};

export default CompanyProfilePage;
