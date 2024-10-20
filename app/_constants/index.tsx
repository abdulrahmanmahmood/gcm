import { IDrawerItem } from "../_interfaces";
import { RiHome5Fill } from "react-icons/ri";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { PiBuildingOfficeThin } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { LuContainer } from "react-icons/lu";
import { GrHostMaintenance } from "react-icons/gr";
import { GrVmMaintenance } from "react-icons/gr";

export const DrawerItems: IDrawerItem[] = [
  {
    title: "Home",
    icon: (
      <RiHome5Fill className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/",
    id: "0",
  },
  {
    title: "User Management",
    icon: (
      <PiUsersThreeDuotone className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/usermanage",
    id: "1",
  },
  {
    title: "Company Management",
    icon: (
      <PiBuildingOfficeThin className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/companymanage",
    id: "2",
  },
  {
    title: "Document Management",
    icon: (
      <CgFileDocument className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/documentmanage",
    id: "3",
  },
  {
    title: "Container Management",
    icon: (
      <LuContainer className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/containermanage",
    id: "4",
  },
  {
    title: "Vehicle Management",
    icon: (
      <LuContainer className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/vehicle-management",
    id: "5",
  },
  {
    title: "Maintenace",
    icon: (
      <GrVmMaintenance className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />
    ),
    url: "/maintenance",
    id: "6",
  },
];
