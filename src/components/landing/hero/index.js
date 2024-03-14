import React from "react";
import Link from "next/link";
import Image from "next/image";
import { landingData } from "../../../constants";
import { tick, mobilekyc } from "../../../assets";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function KYC() {
  return (
    <div className="flex min-h-screen w-full items-center max-sm:py-10 sm:items-start sm:pt-[6rem] sm:justify-between max-sm:flex-col justify-start font-medium lg:px-[5rem] sm:px-[3rem]">
      <div className="flex justify-center items-start flex-col lg:w-3/5 sm:w-2/3 z-10">
        <h2 className="text-5xl md:text-7xl font-bold text-Text-Black font-inter">
          KYC
        </h2>
        <h2 className="text-3xl md:text-6xl font-semibold lineUp text-Text-Black font-inter">
          starts here.
        </h2>
        <p className="text-justify text-Text-Grey-Light mt-[1rem] text-xl md:text-2xl font-poppins">
          Complete .
        </p>
        <div className="flex justify-center items-center z-10 sm:hidden w-full mt-4">
          <Image src={mobilekyc} alt="mobilekyc" height={150} width={150} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-[1.5rem] ">
          {landingData.map((item, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <Image src={tick} alt="tick" className="h-8 w-8" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 space-x-4">
          <Link href="/user/kyc">
            <button className="px-4 sm:px-6 py-3 font-inter bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
              Online KYC
            </button>
          </Link>

          <Link href="/user" className="">
            <button className="px-4 sm:px-6 py-3 font-inter bg-lightBg shadow-md text-black rounded-lg focus:outline-none focus:ring focus:ring-gray-500">
              Compare Prices
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center lg:w-2/5 sm:w-1/3 max-sm:h-[25vh] z-10 max-sm:hidden">
        <Image
          src={mobilekyc}
          alt="mobilekyc"
          height={300}
          width={300}
          className=""
        />
      </div>
    </div>
  );
}
