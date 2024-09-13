import Image, { StaticImageData } from "next/image";
import React from "react";
import testImage from "../../../../public/logo.jpg";
import Link from "next/link";
interface Iprops {
  image?: string | StaticImageData;
  email: string;
  id: string;
  industry: string;
  name: string;
  type: string | undefined;
  enabled: boolean;
  locked: boolean;
  url: string;
  website: string;
  status: string;
}

const CompanyViewCardHeader = ({
  image,
  type,
  email,
  enabled,
  industry,
  id,
  locked,
  name,
  url,
  website,
  status

}: Iprops) => {
  return (
    <div className="w-full px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
      <div className="flex flex-wrap mb-6 xl:flex-nowrap">
        <div className="mb-5 mr-5">
          <div className="relative inline-block shrink-0 rounded-2xl">
            <Image
              className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]"
              src={testImage}
              alt="image"
            />
          </div>
        </div>
        <div className="grow">
          <div className="flex flex-wrap items-start justify-between mb-2">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <p className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1">
                  {name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap my-auto">
              <Link
                href={url}
                className="inline-block px-6 bg-petrol text-white py-1.5 mr-3 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-xl text-muted bg-light border-light hover:bg-light-dark active:bg-light-dark focus:bg-light-dark"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap items-center">
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                ID: <span className="ml-2 text-petrol">{id}</span>
              </p>
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                Industry{" "}
                <span className="ml-2 text-petrol">
                  {industry ? industry : "not have Industry"}
                </span>
              </p>
              <p className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                Type <span className="ml-2 text-petrol">{type}</span>
              </p>
            </div>
          </div>
          {/* Status Section */}
          <div className="flex flex-wrap pr-2 mb-4 font-medium my-5">
            <p className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary text-petrol">
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-petrol"
                >
                  <g>
                    <rect
                      x="244"
                      y="4.608"
                      fill="#25B6D2"
                      width="24"
                      height="489.92"
                    />
                    <rect
                      x="11.632"
                      y="244"
                      fill="#25B6D2"
                      width="493.624"
                      height="24"
                    />
                    <path
                      fill="#25B6D2"
                      d="M255.712,196.648c-128.36,0-179.528-106.68-181.6-111.2l21.752-10.144l-10.872,5.072l10.864-5.088
            c1.872,4,47.152,97.376,159.896,97.376c113.168,0,158.168-95.272,158.608-96.232l21.816,10
            C401.792,154.424,331.904,197.112,255.712,196.648z"
                    />
                    <path
                      fill="#25B6D2"
                      d="M95.824,436.712l-21.752-10.144c2.112-4.536,53.28-111.2,181.64-111.2
            c76.176-0.448,146.056,42.248,180.424,110.232l-21.816,10c-30.456-59.456-91.808-96.688-158.608-96.248
            C142.488,339.352,96.272,435.736,95.824,436.712z"
                    />
                    <path
                      fill="#25B6D2"
                      d="M242.608,510.656c-4.848-4.44-118.752-110.36-118.752-254.656
            c0-144.512,116.504-246.512,121.472-250.792l15.664,18.176C259.856,24.368,147.856,122.68,147.856,256
            c0,133.832,109.84,235.936,110.952,236.952L242.608,510.656z"
                    />
                    <path
                      fill="#25B6D2"
                      d="M269.392,510.656l-16.208-17.696c1.112-1.024,110.96-103.416,110.96-236.96
            s-112-231.624-113.128-232.6l15.656-18.184C271.632,9.488,388.144,111.488,388.144,256
            C388.144,400.296,274.24,506.216,269.392,510.656z"
                    />
                    <path
                      fill="#25B6D2"
                      d="M256,512C114.616,512,0,397.384,0,256S114.616,0,256,0s256,114.616,256,256
            C511.832,397.312,397.312,511.832,256,512z M256,24C127.872,24,24,127.872,24,256s103.872,232,232,232s232-103.872,232-232
            C487.84,127.936,384.064,24.16,256,24z"
                    />
                  </g>
                </svg>
              </span>
              {website}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-success text-3xl text-greening">●</span>
            {status}
          </div>
        </div>
        {/* Status Section */}
      </div>
      <hr className="w-full h-px border-neutral-200" />
    </div>
  );
};

export default CompanyViewCardHeader;
