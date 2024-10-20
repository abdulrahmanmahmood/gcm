"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import placeholderImage from "../../../../public/healthicons_ui-user-profile.png";
import { deleteOne } from "@/app/_utils/general/DeleteOne";
import { uploadFiles } from "@/app/_utils/general/Upload";
import { toast, ToastContainer } from "react-toastify";

interface VehiclePicturesProps {
  vehicleId: number;
  pictures: Array<{
    data: string;
    contentType: string;
    basename: string;
    id: number;
  }>;
  refetch: () => void; // Function to refresh vehicle data after changes
}

const VehiclePictures: React.FC<VehiclePicturesProps> = ({
  vehicleId,
  pictures,
  refetch,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );

  // Mutation for deleting a vehicle picture
  const deleteMutation = useMutation({
    mutationFn: (pictureId: number) =>
      deleteOne(
        `management/vehicle/${vehicleId}/picture/${pictureId}/delete`,
        vehicleId,
        pictureId,
        "Vehicle Picture"
      ),
    onSuccess: () => {
      if (!toast.isActive(11, "VehiclePictures")) {
          toast.success("Picture deleted successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          toastId: 11,
        });
        refetch();
        console.log("test log of delete vehicle image")

      }
      console.log("successdlelteimage");
    },
    onError: (error: any) => {
      if (!toast.isActive(11, "VehiclePictures")) {
        toast.error(
          error?.response?.data?.message
            ? `Failed to delete image: ${error.response.data.message}`
            : "Failed to delete image. Please try again.",
          {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            toastId: 11,
          }
        );
        console.log("test log of delete vehicle image");
      }
    },
  });

  // Mutation for uploading an image
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedImage) throw new Error("No image selected");

      const uploadData = {
        pictures: selectedImage,
      };

      return uploadFiles(
        `management/vehicle/${vehicleId}/picture/upload`,
        uploadData
      );
    },
    onSuccess: () => {
      if (!toast.isActive(12, "VehiclePictures")) {
        toast.success("Picture uploaded successfully!", {
          autoClose: 2000,
          closeOnClick: true,
          toastId: 12,
        });
      }
      setSelectedImage(null);
      refetch();
    },
    onError: (error: any) => {
      if (!toast.isActive(12, "VehiclePictures")) {
        toast.error(
          error?.response?.data?.message
            ? `Failed to upload image: ${error.response.data.message}`
            : "Failed to upload image. Please try again.",
          {
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            toastId: 12,
          }
        );
      }
    },
  });

  const handleDelete = (pictureId: number) => {
    if (window.confirm("Are you sure you want to delete this picture?")) {
      deleteMutation.mutate(pictureId);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;
    uploadMutation.mutate();
  };

  return (
    <div className="bg-white shadow-xl border-2 rounded-lg p-6 my-9">
      <h3 className="text-2xl font-semibold  text-petrol text-center  mb-9 ">
        Vehicle Pictures
      </h3>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper flex items-center h-[300px] w-[70%] mt-5 "
        >
          {pictures.map((picture, index) => (
            <SwiperSlide key={picture.id}>
              <div
                className="flex flex-col justify-between border-2 items-center shadow-lg p-2 h-[250px]"
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
              >
                <Image
                  src={`data:${picture.contentType};base64,${picture.data}`}
                  alt={picture.basename}
                  width={250}
                  height={250}
                  className="object-contain max-h-[220px] mx-auto rounded-lg"
                />
                {hoveredImageIndex === index && (
                  <button
                    onClick={() => handleDelete(picture.id)}
                    className="bg-red-600 mx-auto text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}

          {selectedImage && (
            <SwiperSlide key={"selectedImage"}>
              <div className="flex flex-col justify-between border-2 items-center shadow-lg w-[300px] p-2 h-[250px]">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  width={250}
                  height={250}
                  className="object-contain max-h-[200px] mx-auto rounded-lg"
                />
                <button
                  onClick={handleImageUpload}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-4 rounded"
                >
                  Upload Image
                </button>
              </div>
            </SwiperSlide>
          )}

          {!selectedImage && (
            <SwiperSlide key={"uploadPlaceholder"}>
              <label htmlFor="profileImages" className="mb-4 cursor-pointer">
                <div className="relative border-2 items-center shadow-lg w-[200px] p-2 h-[200px] my-auto mt-5">
                  <Image
                    src={placeholderImage}
                    alt="Placeholder Image"
                    width={160}
                    height={140}
                    className="rounded-xl object-fit mx-auto border-2"
                  />
                  <p className="text-center text-gray-500">Upload Image</p>
                </div>
                <input
                  type="file"
                  id="profileImages"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <ToastContainer containerId={"VehiclePictures"} />
    </div>
  );
};

export default VehiclePictures;
