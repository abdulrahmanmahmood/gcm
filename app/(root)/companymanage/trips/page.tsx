"use client";
import TableBodyRow from "@/app/_components/UI/TableBodyRow";
import TableHeader from "@/app/_components/UI/TableHeader";
import { clientContainer } from "@/app/_interfaces";
import { FetchAllData } from "@/app/_utils/general/FetchAllData";
import Pagination from "@/app/_utils/Pagination";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { updateEntity } from "@/app/_utils/general/Update";
import TripsNav from "@/app/_components/UI/Compaines/trips/TripsNav";
import { generateManifest } from "@/app/_utils/company/trips/GenerrateManifest";
import Modal from "@/app/_components/UI/Compaines/trips/ManifestModal";
import ManifestTemplate from "@/app/_components/UI/Compaines/trips/ManifestTemplate";
import { uploadFiles } from "@/app/_utils/general/Upload";

const page = () => {
  const [pageNumber, setPageNumber] = useState(0); // Track the current page
  const [pageSize, setPageSize] = useState(10); // Track the page size
  const [searchKeyword, setSearchKeyword] = useState(""); // Track the search keyword
  const [filters, setFilters] = useState<any>({}); // Store the filters here
  const [sortBy, setSortBy] = useState<string[]>(["ID_ASC"]); // Default sort by ID ascending
  const [allChecked, setAllChecked] = useState(false); // Track if all rows are checked
  const [checkedRows, setCheckedRows] = useState<number[]>([]); // Track checked rows
  const [manifestData, setManifestData] = useState<any>(null);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users", pageNumber, pageSize, searchKeyword, filters, sortBy],
    queryFn: () =>
      FetchAllData(
        "management/trip/all",
        pageNumber,
        pageSize,
        searchKeyword,
        filters,
        sortBy,
        "vehicles"
        // sortDirection
      ),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
  // Add manifest generation mutation
  const manifestMutation = useMutation({
    mutationFn: (tripId: number) => generateManifest(tripId),
    onSuccess: (data) => {
      setManifestData(data.data);
      setIsManifestOpen(true);
      // toast.success("Manifest generated successfully!");
      refetch();
    },
    onError: (error) => {
      console.error("Error generating manifest:", error);
      toast.error("Failed to generate manifest. Please try again.");
    },
  });
  // Update the handle function to use the mutation
  const handleGenerateManifest = (id: number) => {
    manifestMutation.mutate(id);
    console.log(id);
  };
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile || !selectedTripId)
        throw new Error("Invalid upload data");

      const endpoint = `management/trip/${selectedTripId}/manifest/upload`;
      const formData = { "manifest-file": selectedFile };

      await uploadFiles(endpoint, formData, { method: "PUT" });
    },
    onSuccess: () => {
      toast.success("Manifest uploaded successfully!");
      refetch();
      setIsUploadModalOpen(false); // Close the modal
      setSelectedFile(null);
      setSelectedTripId(null);
    },
    onError: (error) => {
      console.error("Upload failed", error);
      toast.error("Failed to upload manifest. Please try again.");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) setSelectedFile(file);
  };

  const handleUploadManifest = (tripId: number) => {
    setSelectedTripId(tripId);
    setIsUploadModalOpen(true); // Open the upload modal
  };

  const handleUpload = () => {
    uploadMutation.mutate(); // Trigger the upload mutation
  };

  const handleCancel = () => {
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    setSelectedTripId(null);
  };

  useEffect(() => {
    refetch();
  }, [searchKeyword, filters, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Format date as DD/MM/YYYY
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Format time as HH:MM:SS
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return (
      <div className="flex flex-col items-center">
        <span className="font-medium">{formattedDate}</span>
        <span className="text-sm text-gray-500">{formattedTime}</span>
      </div>
    );
  };
  // Handle Search
  const handleSearch = (keyword: string, filters: any) => {
    setSearchKeyword(keyword);
    setFilters(filters);
    setPageNumber(0); // Reset to first page when new search is triggered
  };
  // Sort Mapping
  const sortMapping: { [key: string]: string } = {
    id: "ID",
    hasManifest: "HASMANIFEST",
    hasRecycleReceipt: "HASRECYCLERECEIPT",
  };
  const handleSort = (column: string) => {
    const mappedColumn = sortMapping[column];
    const currentSort = sortBy.find((sort) => sort.startsWith(mappedColumn));

    let newSortArray = [...sortBy];

    if (currentSort) {
      // If sorting by the same column, toggle between ASC and DESC
      const newSortDirection = currentSort.endsWith("ASC") ? "DESC" : "ASC";
      newSortArray = newSortArray.map((sort) =>
        sort.startsWith(mappedColumn)
          ? `${mappedColumn}_${newSortDirection}`
          : sort
      );
    } else {
      // If sorting by a new column, add it to the array
      newSortArray = [`${mappedColumn}_ASC`, ...newSortArray];
    }

    setSortBy(newSortArray);
    setPageNumber(0); // Reset to first page when new sorting is triggered
  };
  //////////////// pagination ///////////////////
  // Function to handle page changes
  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };
  // Function to handle page size changes
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageNumber(0); // Reset to first page when changing page size
  };
  /////////////////////////Make the CheckBox //////////////////////
  const handleToggleAll = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);

    if (newAllChecked) {
      // If checking all, add all vehicle IDs to the array
      setCheckedRows(data?.content.map((vehicle: any) => vehicle.id) || []);
    } else {
      // If unchecking all, clear the array
      setCheckedRows([]);
    }
  };
  const handleToggleRow = (id: number) => {
    setCheckedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  // TableBodyRow
  // Columns Configuration
  const Headercolumns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Created At", key: "createdDate", sortable: true },
    { label: "company", key: "company", sortable: false },
    { label: "project", key: "project", sortable: false },
    { label: "Has Manifest", key: "hasManifest", sortable: false },
    { label: "hasRecycleReceipt", key: "hasRecycleReceipt", sortable: false },
  ];
  const columns = [
    {
      key: "id" as keyof clientContainer,
      label: "ID",
    },
    {
      key: "createdDate" as keyof clientContainer,
      label: "Created At",
      render: (value: string) => formatDate(value),
    },
    { key: "company" as keyof clientContainer, label: "company" },
    { key: "project" as keyof clientContainer, label: "project" },
    {
      key: "hasManifest" as keyof clientContainer,
      label: "Has Manifest",
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "hasRecycleReceipt" as keyof clientContainer,
      label: "hasRecycleReceipt",
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  const downloadHandler = async (options = {}) => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Dynamically import html2pdf.js
      const html2pdf = (await import("html2pdf.js")).default;

      const element = document.getElementById("manifest-template");
      if (!element) {
        alert("Manifest template not found.");
        return;
      }

      const opt = {
        margin: 0,
        filename: `Manifest-${manifestData?.manifestNo || "default"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
      };

      // Generate and download the PDF
      html2pdf().from(element).set(opt).save();
    } else {
      // We are on the server, do nothing or handle accordingly
      console.warn("downloadHandler was called on the server.");
    }
  };

  return (
    <>
      <TripsNav onSearch={handleSearch} />
      {/* Table */}
      <div className="overflow-auto h-[72vh] shadow-md p-1">
        <table className="w-full border-collapse bg-white text-sm text-petrol text-center text-nowrap">
          {/* Use GeneralTableHeader */}
          <TableHeader
            columns={Headercolumns}
            sortBy={sortBy}
            onSort={handleSort}
            allChecked={allChecked}
            onToggleAll={handleToggleAll}
          />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 max-h-[60vh]">
            {data?.content?.map((vehicle: clientContainer) => (
              <TableBodyRow
                key={vehicle.id}
                data={vehicle}
                columns={columns}
                isChecked={checkedRows.includes(vehicle.id)}
                onToggle={() => handleToggleRow(vehicle.id)}
                actions={{
                  // viewPath: `/companymanage/trips/${vehicle.id}`,
                  extraActions: [
                    {
                      name: "Generate Trip Manifest",
                      handler: handleGenerateManifest,
                    },
                    {
                      name: "Upload Manifest",
                      handler: handleUploadManifest, // Use the new handler
                    },
                    // Add as many additional actions as needed
                  ],
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* Manifest Modal */}
      <Modal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
        title="Waste Manifest"
        onDownload={downloadHandler}
      >
        <div id="manifest-template" className="p-4">
          {manifestData && <ManifestTemplate data={manifestData} />}
        </div>
      </Modal>
      {/* File Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={handleCancel}
        title="Upload Manifest"
      >
        <div className="p-4">
          {selectedFile ? (
            <div className="mb-4">
              <p className="font-semibold">Selected File:</p>
              <p>{selectedFile.name}</p>
            </div>
          ) : (
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded-md w-full"
            />
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleCancel}
              className="border px-4 py-2 bg-redd font-semibold text-white rounded-md"
              disabled={uploadMutation.isPending}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="bg-petrol text-white px-4 py-2 rounded-md"
              disabled={!selectedFile || uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Page Size Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-gray-700">
            Rows per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Pagination */}
        <Pagination
          onPageChange={handlePageChange}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalElementsCount={data?.totalElementsCount ?? 0}
        />

        {/* Displaying Total Users */}
        <div className="flex items-center space-x-2 mr-5">
          <span className="text-gray-700">
            Total: {data?.totalElementsCount} vehicles
          </span>
        </div>
        <ToastContainer containerId={"TripContainer"} />
      </div>
    </>
  );
};

export default page;
