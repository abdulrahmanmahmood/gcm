import { IDrawerItem } from "../_interfaces";
import { RiHome5Fill } from "react-icons/ri";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { PiBuildingOfficeThin } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";

export const DrawerItems: IDrawerItem[] = [
  {
    title: "Home",
    icon: <RiHome5Fill className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />,
    url: "/",
    id: "0",
  },
  {
    title: "User Management",
    icon: <PiUsersThreeDuotone className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />,
    url: "/usermanage",
    id: "1",
  },
  {
    title: "Company Management",
    icon: <PiBuildingOfficeThin className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />,
    url: "/companymanage",
    id: "2",
  },
  {
    title: "Document Management",
    icon: <CgFileDocument className="text-center text-xl md:text-2xl lg:text-3xl font-bold" />,
    url: "/documentmanage",
    id: "3",
  },
];
