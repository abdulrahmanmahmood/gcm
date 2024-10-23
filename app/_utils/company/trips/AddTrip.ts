import { getCookie } from "cookies-next";
import { baseUrl } from "@/app/_axios/axios";
import sendMixedContentRequestFormsAndFiles from "../../general/sendMixedFormsAndFiles";

interface Weight {
  value: string;
  unit: string;
}

export interface IDeliveryNoteInput {
  employeeId: string;
  vehicleId: string;
  projectId: string;
  vehiclePermitId: string;
  removalDate: string;
  wasteTypes: string[];
  otherWasteType: string;
  description: string;
  weight: Weight;
  disposalMethodType: string;
  skipColorCode: string;
}

export interface IRecycleReceiptInput {
  companyId: string;
  designation: string;
  recycleDate: string;
  wasteTypes: string[];
  otherWasteType: string;
  vehicleNo: string;
  weight: Weight;
}

export const addTrip = async (
  deliveryNoteData: IDeliveryNoteInput,
  recycleReceiptData: IRecycleReceiptInput,
  manifestFile: File | null,
  deliveryNoteFile: File | null,
  recycleReceiptFile: File | null
) => {
  const token = getCookie("token") as string;

  const jsonParts = [
    { key: "delivery-note-form", data: deliveryNoteData },
    { key: "recycle-receipt-form", data: recycleReceiptData },
  ];

  const fileParts = [
    { key: "manifest-file", file: manifestFile },
    { key: "delivery-note-file", file: deliveryNoteFile },
    { key: "recycle-receipt-file", file: recycleReceiptFile },
  ];

  return sendMixedContentRequestFormsAndFiles({
    fileParts,
    jsonParts,
    token,
    url: `${baseUrl}/management/trip/new`,
  });
};

export default addTrip;
