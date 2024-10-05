"use client"; // This ensures the component runs in the browser (client-side)

import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromCookie = getCookie("token") as string | null;
    setToken(tokenFromCookie);

    if (!tokenFromCookie) {
      console.log("Token not found, redirecting...");
      // Uncomment this to actually redirect
      redirect("/login");
    } else {
      console.log("Token found:", tokenFromCookie);
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <input
        type="text"
        placeholder="Search"
        className=" w-[70%] p-4 bg-[#F5F7FB] mx-auto rounded-lg  ml-20 text-petrol"
      />
      <div className="mx-auto">
        <svg
          width="500"
          height="500"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-center mx-auto my-auto"
        >
          <path d="M500 382.4H0V382.65H500V382.4Z" fill="#EBEBEB" />
          <path d="M449.9 398.49H416.78V398.74H449.9V398.49Z" fill="#EBEBEB" />
          <path
            d="M331.22 401.21H322.53V401.46H331.22V401.21Z"
            fill="#EBEBEB"
          />
          <path
            d="M415.78 389.21H396.59V389.46H415.78V389.21Z"
            fill="#EBEBEB"
          />
          <path d="M95.65 390.89H52.46V391.14H95.65V390.89Z" fill="#EBEBEB" />
          <path
            d="M110.89 390.89H104.56V391.14H110.89V390.89Z"
            fill="#EBEBEB"
          />
          <path
            d="M225.15 395.11H131.47V395.36H225.15V395.11Z"
            fill="#EBEBEB"
          />
          <path
            d="M237 337.8H43.91C42.3973 337.797 40.9475 337.195 39.8788 336.124C38.8102 335.053 38.21 333.603 38.21 332.09V60.66C38.2231 59.156 38.8292 57.718 39.8964 56.6582C40.9637 55.5985 42.4059 55.0026 43.91 55H237C238.514 55 239.967 55.6016 241.038 56.6724C242.108 57.7433 242.71 59.1956 242.71 60.71V332.09C242.71 333.604 242.108 335.057 241.038 336.128C239.967 337.198 238.514 337.8 237 337.8ZM43.91 55.2C42.4636 55.2026 41.0774 55.7791 40.0556 56.8027C39.0338 57.8264 38.46 59.2136 38.46 60.66V332.09C38.46 333.536 39.0338 334.924 40.0556 335.947C41.0774 336.971 42.4636 337.547 43.91 337.55H237C238.447 337.547 239.834 336.971 240.858 335.948C241.881 334.924 242.457 333.537 242.46 332.09V60.66C242.457 59.2127 241.881 57.8255 240.858 56.8021C239.834 55.7787 238.447 55.2026 237 55.2H43.91Z"
            fill="#EBEBEB"
          />
          <path
            d="M453.31 337.8H260.21C258.696 337.797 257.246 337.195 256.175 336.125C255.105 335.054 254.503 333.604 254.5 332.09V60.66C254.516 59.1551 255.124 57.7171 256.193 56.6576C257.262 55.5981 258.705 55.0025 260.21 55H453.31C454.812 55.0052 456.252 55.6022 457.317 56.6617C458.382 57.7212 458.987 59.1578 459 60.66V332.09C459 333.601 458.401 335.05 457.335 336.121C456.268 337.191 454.821 337.795 453.31 337.8ZM260.21 55.2C258.763 55.2026 257.375 55.7787 256.352 56.8021C255.329 57.8255 254.753 59.2127 254.75 60.66V332.09C254.753 333.537 255.329 334.924 256.352 335.948C257.375 336.971 258.763 337.547 260.21 337.55H453.31C454.757 337.547 456.145 336.971 457.168 335.948C458.191 334.924 458.767 333.537 458.77 332.09V60.66C458.767 59.2127 458.191 57.8255 457.168 56.8021C456.145 55.7787 454.757 55.2026 453.31 55.2H260.21Z"
            fill="#EBEBEB"
          />
          <path d="M218.45 285.87H92.03V294.79H218.45V285.87Z" fill="#EBEBEB" />
          <path
            d="M218.45 285.87H163.48V294.79H218.45V285.87Z"
            fill="#E0E0E0"
          />
          <path d="M110.71 294.79H92.03V382.4H110.71V294.79Z" fill="#EBEBEB" />
          <path
            d="M110.71 303.83L92.03 297.47V294.79H110.71V303.83Z"
            fill="#E0E0E0"
          />
          <path d="M218.45 294.79H199.77V382.4H218.45V294.79Z" fill="#E0E0E0" />
          <path d="M182.16 294.79H163.48V382.4H182.16V294.79Z" fill="#EBEBEB" />
          <path
            d="M182.15 303.83L163.48 297.47V294.79H182.15V303.83Z"
            fill="#E0E0E0"
          />
          <path d="M147 294.79H128.32V382.4H147V294.79Z" fill="#E0E0E0" />
          <path d="M230.33 87.17H71V222.84H230.33V87.17Z" fill="#EBEBEB" />
          <path
            d="M230.33 222.83H232.11L232.11 87.16H230.33L230.33 222.83Z"
            fill="#E0E0E0"
          />
          <path
            d="M224.34 216.83V93.16L77.01 93.16V216.83H224.34Z"
            fill="#F5F5F5"
          />
          <path
            d="M148.89 198.06C157.89 168.06 160.39 123.81 179.53 129.91C198.67 136.01 173.6 201.44 173.6 201.44L148.89 198.06Z"
            fill="white"
          />
          <path
            d="M164.35 199.55C155.19 156.07 157.5 98.3499 129.04 99.6699C100.58 100.99 129.04 201.44 129.04 201.44L164.35 199.55Z"
            fill="white"
          />
          <path
            d="M184.46 194.67H122.15C120.879 194.629 119.642 195.089 118.707 195.952C117.771 196.814 117.212 198.009 117.15 199.28C115.88 227.98 120.58 257.28 129.33 285.87H177.04C185.79 257.23 190.49 227.98 189.22 199.28C189.171 198.047 188.65 196.88 187.763 196.022C186.877 195.163 185.694 194.679 184.46 194.67Z"
            fill="#EBEBEB"
          />
          <path d="M326.2 102.3H322.69V382.4H326.2V102.3Z" fill="#E0E0E0" />
          <path d="M408.69 102.3H405.18V382.4H408.69V102.3Z" fill="#E0E0E0" />
          <path d="M301.31 102.3H297.8V382.4H301.31V102.3Z" fill="#EBEBEB" />
          <path d="M383.8 102.3H380.29V382.4H383.8V102.3Z" fill="#EBEBEB" />
          <path d="M408.69 100.38H297.8V104.21H408.69V100.38Z" fill="#EBEBEB" />
          <path d="M408.69 168.97H297.8V172.8H408.69V168.97Z" fill="#EBEBEB" />
          <path d="M408.69 237.56H297.8V241.39H408.69V237.56Z" fill="#EBEBEB" />
          <path d="M408.69 306.15H297.8V309.98H408.69V306.15Z" fill="#EBEBEB" />
          <path d="M408.69 374.74H297.8V378.57H408.69V374.74Z" fill="#EBEBEB" />
          <path d="M408.69 100.38H383.8V104.21H408.69V100.38Z" fill="#E0E0E0" />
          <path d="M408.69 168.97H383.8V172.8H408.69V168.97Z" fill="#E0E0E0" />
          <path d="M408.69 237.56H383.8V241.39H408.69V237.56Z" fill="#E0E0E0" />
          <path d="M408.69 306.15H383.8V309.98H408.69V306.15Z" fill="#E0E0E0" />
          <path d="M408.69 374.74H383.8V378.57H408.69V374.74Z" fill="#E0E0E0" />
          <path
            d="M342.53 123.71V118.31H329.2V123.71C329.2 125.403 328.528 127.027 327.332 128.225C326.136 129.423 324.513 130.097 322.82 130.1C321.127 130.1 319.503 130.772 318.305 131.968C317.107 133.164 316.433 134.787 316.43 136.48V169H355.31V136.48C355.307 134.787 354.633 133.164 353.435 131.968C352.237 130.772 350.613 130.1 348.92 130.1C347.225 130.1 345.6 129.427 344.402 128.228C343.203 127.03 342.53 125.405 342.53 123.71Z"
            fill="#F0F0F0"
          />
          <path d="M370.12 215.26H311.7V237.57H370.12V215.26Z" fill="#F0F0F0" />
          <path
            d="M370.12 237.56H380.29V215.25H370.12V237.56Z"
            fill="#E6E6E6"
          />
          <path
            d="M370.12 227.64H380.29V225.18H370.12V227.64Z"
            fill="#EBEBEB"
          />
          <path d="M370.12 225.18H311.7V227.64H370.12V225.18Z" fill="#F5F5F5" />
          <path d="M354.47 335.3H308.84V374.74H354.47V335.3Z" fill="#F0F0F0" />
          <path
            d="M354.47 374.75H362.41V335.31H354.47V374.75Z"
            fill="#E6E6E6"
          />
          <path d="M354.47 357.2H362.41V352.85H354.47V357.2Z" fill="#EBEBEB" />
          <path d="M354.47 352.85H308.84V357.2H354.47V352.85Z" fill="#F5F5F5" />
          <path d="M354.47 349.8H362.41V348.25H354.47V349.8Z" fill="#EBEBEB" />
          <path d="M354.47 348.25H308.84V349.8H354.47V348.25Z" fill="#F5F5F5" />
          <path d="M319.96 266.05H311.7V306.15H319.96V266.05Z" fill="#F0F0F0" />
          <path d="M319.96 280.34H311.7V291.86H319.96V280.34Z" fill="#FAFAFA" />
          <path
            d="M319.96 306.16H348.06V266.06H319.96V306.16Z"
            fill="#E6E6E6"
          />
          <path
            d="M332.72 260.87H323.39V306.15H332.72V260.87Z"
            fill="#EBEBEB"
          />
          <path
            d="M332.72 275.26H323.39V282.23H332.72V275.26Z"
            fill="#FAFAFA"
          />
          <path d="M332.72 286.9H323.39V293.87H332.72V286.9Z" fill="#FAFAFA" />
          <path
            d="M332.73 306.15H364.46V260.87H332.73V306.15Z"
            fill="#E0E0E0"
          />
          <path
            d="M343.11 266.05H338.08V306.15H343.11V266.05Z"
            fill="#F0F0F0"
          />
          <path
            d="M342.24 271.13H338.94V301.07H342.24V271.13Z"
            fill="#FAFAFA"
          />
          <path d="M343.1 306.16H360.19V266.06H343.1V306.16Z" fill="#E6E6E6" />
          <path
            d="M356.54 263.94H350.86V306.15H356.54V263.94Z"
            fill="#EBEBEB"
          />
          <path
            d="M356.54 277.35H350.86V283.85H356.54V277.35Z"
            fill="#FAFAFA"
          />
          <path
            d="M356.54 288.21H350.86V294.71H356.54V288.21Z"
            fill="#FAFAFA"
          />
          <path
            d="M356.54 306.15H375.84V263.94H356.54V306.15Z"
            fill="#E0E0E0"
          />
          <path
            d="M353.957 211.617C358.815 206.759 358.815 198.882 353.957 194.024C349.099 189.166 341.222 189.166 336.364 194.024C331.506 198.882 331.506 206.759 336.364 211.617C341.222 216.475 349.099 216.475 353.957 211.617Z"
            fill="#F5F5F5"
          />
          <path
            d="M360.311 215.121C365.011 214.358 368.202 209.93 367.439 205.231C366.676 200.532 362.248 197.341 357.549 198.104C352.85 198.866 349.659 203.294 350.422 207.993C351.184 212.693 355.612 215.884 360.311 215.121Z"
            fill="#EBEBEB"
          />
          <path
            d="M250 427.56C357.082 427.56 443.89 422.492 443.89 416.24C443.89 409.988 357.082 404.92 250 404.92C142.917 404.92 56.11 409.988 56.11 416.24C56.11 422.492 142.917 427.56 250 427.56Z"
            fill="#F5F5F5"
          />
          <path
            d="M126.11 338.69H254.55V405C254.55 405.85 254.383 406.691 254.057 407.476C253.732 408.261 253.256 408.974 252.655 409.575C252.054 410.176 251.341 410.652 250.556 410.978C249.771 411.303 248.93 411.47 248.08 411.47H132.58C131.73 411.47 130.889 411.303 130.104 410.978C129.319 410.652 128.606 410.176 128.005 409.575C127.404 408.974 126.928 408.261 126.602 407.476C126.277 406.691 126.11 405.85 126.11 405V338.69Z"
            fill="#2E7490"
          />
          <path
            d="M126.11 338.69H217L205.82 324.38C204.59 322.81 201.55 321.54 199.02 321.54H117.28C114.76 321.54 113.7 322.81 114.93 324.38L126.11 338.69Z"
            fill="#2E7490"
          />
          <path
            opacity="0.2"
            d="M126.11 338.69H217L205.82 324.38C204.59 322.81 201.55 321.54 199.02 321.54H117.28C114.76 321.54 113.7 322.81 114.93 324.38L126.11 338.69Z"
            fill="black"
          />
          <path
            d="M254.55 338.69H163.67L174.85 329.36C176.08 328.36 179.12 327.51 181.65 327.51H263.38C265.91 327.51 266.96 328.34 265.73 329.36L254.55 338.69Z"
            fill="#2E7490"
          />
          <path
            opacity="0.2"
            d="M163.67 338.69H254.55V405C254.55 405.85 254.383 406.691 254.057 407.476C253.732 408.261 253.256 408.974 252.655 409.575C252.054 410.176 251.341 410.652 250.556 410.978C249.771 411.303 248.93 411.47 248.08 411.47H170.14C169.29 411.47 168.449 411.303 167.664 410.978C166.879 410.652 166.166 410.176 165.565 409.575C164.964 408.974 164.488 408.261 164.162 407.476C163.837 406.691 163.67 405.85 163.67 405V338.69Z"
            fill="white"
          />
          <path
            opacity="0.5"
            d="M137.39 338.69V384.17L140.53 381.69L142.74 384.17L144.66 381.41L146.63 384.17L149.37 382.1L152.39 384.17V338.69H137.39Z"
            fill="white"
          />
          <path
            d="M157.72 239.48L141.57 225.92"
            stroke="#2E7490"
            strokeMiterlimit="10"
          />
          <path
            d="M166.09 246.51L161.17 242.37"
            stroke="#2E7490"
            strokeMiterlimit="10"
          />
          <path
            d="M214.47 274.89L267.75 208.3L196.81 148.74L149.81 202.67L142.81 216.16C142.462 216.543 142.198 216.994 142.032 217.484C141.867 217.973 141.804 218.492 141.848 219.008C141.892 219.523 142.042 220.023 142.289 220.478C142.535 220.933 142.872 221.332 143.28 221.65L207.28 275.39C208.321 276.229 209.64 276.643 210.973 276.55C212.306 276.458 213.555 275.865 214.47 274.89Z"
            fill="#2E7490"
          />
          <path
            opacity="0.5"
            d="M177.93 225.78L170.26 238.13L173.35 238.8L174.4 241.66L176.45 241.78L177.4 244.23L179.91 244.96L181.84 248.03L189.51 235.68L177.93 225.78Z"
            fill="white"
          />
          <path
            opacity="0.1"
            d="M265.43 206.35L217.65 259.65L149.78 202.67L196.81 148.74L265.43 206.35Z"
            fill="black"
          />
          <path
            d="M265.43 206.35L217.65 259.65L237.43 261.11L284.47 207.18L265.43 206.35Z"
            fill="#2E7490"
          />
          <path
            opacity="0.3"
            d="M265.43 206.35L217.65 259.65L237.43 261.11L284.47 207.18L265.43 206.35Z"
            fill="black"
          />
          <path
            d="M177.78 147.9L129.99 201.21L149.78 202.67L196.81 148.74L177.78 147.9Z"
            fill="#2E7490"
          />
          <path
            opacity="0.4"
            d="M177.78 147.9L129.99 201.21L149.78 202.67L196.81 148.74L177.78 147.9Z"
            fill="black"
          />
          <path
            opacity="0.1"
            d="M250.72 222.76L265.43 206.35L196.81 148.74L188.03 169.9L250.72 222.76Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M149.78 202.67L196.81 148.74L188.03 169.9L154.91 206.98L149.78 202.67Z"
            fill="black"
          />
          <path
            d="M282 106C282.19 106.64 282 107.27 281.58 107.39C281.16 107.51 280.67 107.09 280.48 106.45C280.29 105.81 280.48 105.18 280.9 105.05C281.32 104.92 281.82 105.36 282 106Z"
            fill="#263238"
          />
          <path
            d="M282.07 107.26C281.881 109.46 281.39 111.624 280.61 113.69C281.145 113.875 281.713 113.942 282.276 113.885C282.839 113.828 283.383 113.649 283.87 113.36L282.07 107.26Z"
            fill="#ED847E"
          />
          <path
            d="M283.33 101.73C283.415 101.681 283.479 101.603 283.51 101.51C283.529 101.462 283.537 101.41 283.535 101.358C283.533 101.306 283.521 101.255 283.498 101.208C283.476 101.161 283.444 101.119 283.405 101.085C283.365 101.051 283.32 101.026 283.27 101.01C282.684 100.785 282.053 100.705 281.43 100.777C280.807 100.848 280.21 101.069 279.69 101.42C279.622 101.489 279.582 101.579 279.576 101.675C279.569 101.772 279.598 101.867 279.657 101.943C279.715 102.02 279.799 102.073 279.893 102.093C279.988 102.112 280.086 102.097 280.17 102.05C280.585 101.778 281.06 101.608 281.554 101.556C282.048 101.504 282.547 101.57 283.01 101.75C283.062 101.769 283.117 101.777 283.172 101.774C283.227 101.77 283.281 101.755 283.33 101.73Z"
            fill="#263238"
          />
          <path
            d="M304.24 110.28C304.68 115.58 305.99 125.28 309.12 127.52C309.12 127.52 308.38 133.89 297.12 135.52C284.78 137.34 290.32 130.26 290.32 130.26C296.81 127.66 295.9 122.69 294.04 118.17L298.8 112.71C300.63 110.69 304 107.57 304.24 110.28Z"
            fill="#FFC3BD"
          />
          <path
            d="M313.15 130.11C314.15 129.2 312.15 125.56 310.92 125.05C307.7 123.7 294.53 125.05 289.58 129.3C289.169 130.003 288.921 130.789 288.854 131.601C288.786 132.412 288.901 133.229 289.19 133.99L313.15 130.11Z"
            fill="white"
          />
          <path
            d="M355.09 397.41C354.765 397.558 354.413 397.64 354.056 397.65C353.699 397.66 353.343 397.599 353.01 397.47C352.878 397.366 352.782 397.224 352.733 397.063C352.685 396.902 352.687 396.73 352.74 396.57C352.767 396.439 352.822 396.316 352.901 396.209C352.981 396.102 353.083 396.013 353.2 395.95C354.28 395.32 356.95 396.15 357.06 396.19C357.097 396.2 357.13 396.22 357.154 396.249C357.179 396.277 357.195 396.312 357.2 396.35C357.205 396.39 357.198 396.43 357.181 396.465C357.163 396.501 357.135 396.53 357.1 396.55C356.461 396.904 355.787 397.192 355.09 397.41ZM353.63 396.19L353.4 396.29C353.332 396.327 353.272 396.378 353.226 396.441C353.179 396.503 353.146 396.574 353.13 396.65C353.06 397.01 353.2 397.12 353.24 397.15C353.72 397.49 355.35 397 356.48 396.43C355.559 396.141 354.586 396.059 353.63 396.19Z"
            fill="#2E7490"
          />
          <path
            d="M357.06 396.56C357.027 396.57 356.993 396.57 356.96 396.56C355.96 396.36 353.87 395.11 353.76 394.17C353.744 394.022 353.781 393.873 353.863 393.749C353.945 393.625 354.068 393.533 354.21 393.49C354.348 393.428 354.498 393.396 354.65 393.396C354.802 393.396 354.952 393.428 355.09 393.49C356.25 393.97 357.15 396.21 357.18 396.3C357.2 396.33 357.21 396.364 357.21 396.4C357.21 396.436 357.2 396.47 357.18 396.5C357.166 396.519 357.148 396.534 357.127 396.544C357.106 396.555 357.083 396.56 357.06 396.56ZM354.46 393.83C354.431 393.821 354.399 393.821 354.37 393.83C354.14 393.93 354.15 394.05 354.16 394.1C354.22 394.66 355.64 395.67 356.65 396.04C356.35 395.39 355.65 394.13 354.94 393.83C354.785 393.771 354.614 393.771 354.46 393.83Z"
            fill="#2E7490"
          />
          <path
            d="M296.48 408.15C295.41 408.15 294.38 408 294.03 407.52C293.94 407.395 293.892 407.244 293.892 407.09C293.892 406.936 293.94 406.786 294.03 406.66C294.097 406.544 294.186 406.443 294.292 406.362C294.399 406.282 294.52 406.223 294.65 406.19C296.04 405.82 298.96 407.48 299.08 407.55C299.117 407.568 299.147 407.597 299.166 407.634C299.185 407.67 299.192 407.712 299.185 407.753C299.178 407.793 299.159 407.83 299.129 407.859C299.099 407.887 299.061 407.905 299.02 407.91C298.182 408.066 297.332 408.147 296.48 408.15ZM295.16 406.53C295.031 406.525 294.903 406.542 294.78 406.58C294.62 406.616 294.48 406.713 294.39 406.85C294.25 407.1 294.3 407.22 294.39 407.29C294.78 407.83 296.89 407.84 298.39 407.62C297.394 407.052 296.297 406.681 295.16 406.53Z"
            fill="#2E7490"
          />
          <path
            d="M299 407.92H298.92C297.92 407.47 295.92 405.66 296.07 404.72C296.07 404.5 296.27 404.22 296.81 404.17C297.005 404.148 297.203 404.167 297.391 404.226C297.578 404.284 297.752 404.381 297.9 404.51C298.97 405.38 299.19 407.63 299.2 407.72C299.206 407.755 299.201 407.79 299.187 407.822C299.173 407.854 299.149 407.881 299.12 407.9C299.083 407.92 299.041 407.927 299 407.92ZM297 404.54H296.88C296.52 404.54 296.5 404.72 296.49 404.76C296.4 405.33 297.76 406.76 298.78 407.37C298.693 406.416 298.308 405.513 297.68 404.79C297.493 404.625 297.25 404.535 297 404.54Z"
            fill="#2E7490"
          />
          <path
            d="M308.18 407.72H299.83L299 388.4H307.35L308.18 407.72Z"
            fill="#FFC3BD"
          />
          <path
            d="M366.83 394.53L359.14 397.18L351.16 378.97L358.85 376.32L366.83 394.53Z"
            fill="#FFC3BD"
          />
          <path
            d="M357.31 395.27L366.31 392.52C366.469 392.471 366.64 392.478 366.795 392.54C366.95 392.602 367.078 392.715 367.16 392.86L370.91 399.46C371 399.621 371.053 399.801 371.064 399.986C371.075 400.17 371.044 400.355 370.974 400.526C370.904 400.697 370.796 400.85 370.658 400.974C370.521 401.097 370.357 401.188 370.18 401.24C367.03 402.15 365.46 402.43 361.52 403.64C359.09 404.38 352.97 406.7 349.52 407.39C346.07 408.08 344.96 404.78 346.3 404.19C352.3 401.54 354.76 398.53 356.19 396.19C356.44 395.758 356.838 395.431 357.31 395.27Z"
            fill="#263238"
          />
          <path
            d="M299.89 406.75H309C309.165 406.752 309.324 406.81 309.453 406.913C309.582 407.016 309.672 407.159 309.71 407.32L311.36 414.74C311.401 414.919 311.401 415.105 311.359 415.284C311.318 415.463 311.236 415.63 311.12 415.772C311.005 415.915 310.858 416.029 310.692 416.107C310.525 416.184 310.344 416.223 310.16 416.22C306.87 416.17 302.16 415.97 297.99 415.97C293.16 415.97 291.13 416.24 285.46 416.24C282.04 416.24 281.09 412.78 282.52 412.46C289.05 411.03 292.24 410.88 297.88 407.4C298.478 407.004 299.173 406.779 299.89 406.75Z"
            fill="#263238"
          />
          <path
            d="M324.14 132.84C326.57 135.07 328.67 137.3 330.85 139.63C333.03 141.96 335.05 144.37 337.01 146.94C339.057 149.551 340.915 152.305 342.57 155.18C343.474 156.765 344.257 158.416 344.91 160.12C345.08 160.59 345.25 161.04 345.39 161.55C345.554 162.066 345.691 162.59 345.8 163.12L345.97 163.95L346.09 164.87C346.202 165.713 346.202 166.567 346.09 167.41C345.86 169.001 345.272 170.52 344.37 171.85C343.711 172.822 342.939 173.711 342.07 174.5C340.672 175.768 339.143 176.885 337.51 177.83C334.633 179.476 331.622 180.878 328.51 182.02C322.607 184.211 316.524 185.884 310.33 187.02L308.58 181.02C314.01 178.67 319.51 176.13 324.58 173.42C327.048 172.125 329.424 170.662 331.69 169.04C332.634 168.369 333.502 167.598 334.28 166.74C334.516 166.486 334.715 166.2 334.87 165.89C334.95 165.72 334.87 165.74 334.77 166.1C334.7 166.77 334.71 166.25 334.55 165.89C334.5 165.72 334.41 165.49 334.32 165.27C334.23 165.05 334.12 164.8 334.01 164.56C333.468 163.469 332.864 162.411 332.2 161.39C330.655 159.097 328.986 156.89 327.2 154.78C325.36 152.6 323.42 150.43 321.43 148.3C319.44 146.17 317.35 144.02 315.43 142.04L324.14 132.84Z"
            fill="#FFC3BD"
          />
          <path
            d="M310.87 180.07L303 182.45L308.06 190.77C308.06 190.77 312.71 188.85 313.74 184.9L310.87 180.07Z"
            fill="#FFC3BD"
          />
          <path
            d="M299.82 185.4L302.92 192.26L308.01 190.78L302.95 182.45L299.82 185.4Z"
            fill="#FFC3BD"
          />
          <path
            d="M305.7 135.1C304.95 143.1 321.87 155.48 321.87 155.48L338.16 144.33C335.331 139.113 331.196 134.72 326.16 131.58C316.82 125.6 306.64 125.16 305.7 135.1Z"
            fill="#2E7490"
          />
          <g opacity="0.3">
            <path
              d="M305.7 135.1C304.95 143.1 321.87 155.48 321.87 155.48L338.16 144.33C335.331 139.113 331.196 134.72 326.16 131.58C316.82 125.6 306.64 125.16 305.7 135.1Z"
              fill="white"
            />
          </g>
          <path
            d="M278 134.46C278 134.46 270.69 145.68 288.05 205.86L332.19 199.34C331.57 193.24 324.19 166.63 323.94 137.54C323.93 136.135 323.635 134.747 323.073 133.459C322.512 132.172 321.695 131.011 320.673 130.047C319.651 129.084 318.444 128.338 317.125 127.853C315.806 127.369 314.403 127.157 313 127.23C311.72 127.3 310.4 127.39 309.09 127.52C302.789 128.082 296.525 129.007 290.33 130.29C286.119 131.362 281.997 132.756 278 134.46Z"
            fill="#2E7490"
          />
          <g opacity="0.3">
            <path
              d="M278 134.46C278 134.46 270.69 145.68 288.05 205.86L332.19 199.34C331.57 193.24 324.19 166.63 323.94 137.54C323.93 136.135 323.635 134.747 323.073 133.459C322.512 132.172 321.695 131.011 320.673 130.047C319.651 129.084 318.444 128.338 317.125 127.853C315.806 127.369 314.403 127.157 313 127.23C311.72 127.3 310.4 127.39 309.09 127.52C302.789 128.082 296.525 129.007 290.33 130.29C286.119 131.362 281.997 132.756 278 134.46Z"
              fill="white"
            />
          </g>
          <path
            opacity="0.2"
            d="M276.92 153.8L277.07 153.63L287.45 154.55C289.03 161.25 283.25 170.39 280.2 174.63C278.732 167.751 277.637 160.798 276.92 153.8Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M299 388.41L299.43 398.37H307.78L307.35 388.41H299Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M358.85 376.32L351.16 378.97L355.28 388.36L362.97 385.71L358.85 376.32Z"
            fill="black"
          />
          <path
            d="M303.15 98.3201C304.99 106.39 306.47 111.02 303.66 116.32C299.44 124.21 288.58 123.45 284.37 116.09C280.58 109.46 278.2 97.3801 285.04 91.9401C286.539 90.7366 288.32 89.9353 290.215 89.6122C292.11 89.2891 294.056 89.4547 295.869 90.0935C297.682 90.7322 299.303 91.8229 300.577 93.2625C301.851 94.702 302.736 96.4428 303.15 98.3201Z"
            fill="#FFC3BD"
          />
          <path
            d="M286.94 106.23L283.87 108.11L284.16 97.61C282.181 97.695 280.228 97.1296 278.6 96C279.71 94.94 296.99 88.89 302.38 89.94C302.94 89.71 303.62 88.67 303.62 88.67C303.62 88.67 303.83 89.98 302.92 90.48C303.58 90.35 305.23 90.67 305.69 91.64C304.933 91.4333 304.129 91.4789 303.4 91.77C303.4 91.77 309.4 92.68 307.27 101C304.88 110.17 305.67 115.44 305.67 115.44C305.67 115.44 301.21 118.89 297.33 118.25C293.19 113.69 287.21 108.21 286.94 106.23Z"
            fill="#263238"
          />
          <path
            d="M281.06 95.17C276.19 95.17 274.44 92.79 273.19 90.79C276.69 90.42 283.98 88.17 289.39 87.79C294.8 87.41 300.73 88.42 298.94 90.79C297.15 93.16 281.06 95.17 281.06 95.17Z"
            fill="#263238"
          />
          <path
            d="M282.13 93.0001C278.13 92.4401 274.23 88.6701 277.23 85.0601C278.34 87.7101 285.83 87.4001 291.15 86.2901C298.15 84.8301 303 87.1901 300.52 91.9601C299.16 94.5701 282.13 93.0001 282.13 93.0001Z"
            fill="#263238"
          />
          <path
            d="M291.26 103.84C291.833 105.815 291.741 107.922 291 109.84C290 112.35 287.78 111.84 286.62 109.67C285.62 107.67 284.86 104.04 286.56 102.23C288.26 100.42 290.54 101.47 291.26 103.84Z"
            fill="#FFC3BD"
          />
          <path
            d="M303.71 203.55C303.71 203.55 310.87 264.5 316.07 288.38C321.76 314.54 349.83 385.86 349.83 385.86L363.83 381.02C363.83 381.02 345.83 327.32 341.05 290.75C337.38 262.67 332.15 199.34 332.15 199.34L303.71 203.55Z"
            fill="#263238"
          />
          <path
            d="M346.25 381.38C346.18 381.38 349.12 387.38 349.12 387.38L365.47 382.07L363.55 377.19L346.25 381.38Z"
            fill="#2E7490"
          />
          <path
            opacity="0.3"
            d="M307.66 234.82C309.9 251.76 312.77 271.82 315.29 284.63C319 265 319.87 240.21 307.66 234.82Z"
            fill="black"
          />
          <path
            d="M288.05 205.86C288.05 205.86 282.11 263.12 283.05 288.56C283.99 315.02 296.35 396.44 296.35 396.44H310.48C310.48 396.44 307.88 316.56 308.48 290.58C309.17 262.25 319.79 201.17 319.79 201.17L288.05 205.86Z"
            fill="#263238"
          />
          <path
            d="M293.6 390.81C293.54 390.81 294.4 396.67 294.4 396.67H311.59L312.06 391.44L293.6 390.81Z"
            fill="#2E7490"
          />
          <path
            d="M285.31 148.52C283.75 151 282.17 153.23 280.53 155.52C278.89 157.81 277.17 160.02 275.42 162.22C271.853 166.683 267.987 170.899 263.85 174.84C262.73 175.84 261.7 176.84 260.49 177.75L259.61 178.46L259.17 178.81C259.01 178.94 258.94 179.01 258.61 179.25C257.619 179.957 256.531 180.516 255.38 180.91C253.597 181.519 251.733 181.856 249.85 181.91C248.257 181.964 246.662 181.893 245.08 181.7C239.296 180.942 233.654 179.345 228.33 176.96L230.06 170.96C235.176 171.567 240.329 171.814 245.48 171.7C246.619 171.64 247.754 171.517 248.88 171.33C249.728 171.206 250.551 170.95 251.32 170.57C251.56 170.44 251.69 170.31 251.66 170.28C251.63 170.25 251.79 170.15 251.88 170.06L252.22 169.75L252.89 169.12C253.79 168.32 254.64 167.35 255.52 166.47C257.25 164.61 258.97 162.7 260.6 160.67C262.23 158.64 263.88 156.6 265.48 154.5C267.08 152.4 268.63 150.27 270.19 148.14C271.75 146.01 273.27 143.77 274.71 141.7L285.31 148.52Z"
            fill="#FFC3BD"
          />
          <path
            d="M291.12 145.87C294.48 156.87 274.97 169.06 274.97 169.06L262.29 152.91C265.148 147.585 268.677 142.648 272.79 138.22C281.42 128.83 288.56 137.5 291.12 145.87Z"
            fill="#2E7490"
          />
          <g opacity="0.3">
            <path
              d="M291.12 145.87C294.48 156.87 274.97 169.06 274.97 169.06L262.29 152.91C265.148 147.585 268.677 142.648 272.79 138.22C281.42 128.83 288.56 137.5 291.12 145.87Z"
              fill="white"
            />
          </g>
          <path
            d="M233 171.33L222.73 169.45L223.81 178.33C223.81 178.33 229.15 181.33 233.02 176.64L233 171.33Z"
            fill="#FFC3BD"
          />
          <path
            d="M218.77 171.45L220.99 177.86L223.79 178.33L222.71 169.45L218.77 171.45Z"
            fill="#FFC3BD"
          />
        </svg>
      </div>
    </div>
  );
}

export default Page;
