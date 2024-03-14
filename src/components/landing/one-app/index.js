import React from "react";
import Image from "next/image";
import { jsonData } from "../../../constants";
import { oneapp } from "../../../assets";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function OneApp() {
  return (
    <div className="flex min-h-screen w-full items-center md:items-start md:pt-[2rem] md:justify-between max-md:flex-col justify-start font-medium lg:px-[8rem] md:px-[4rem]">
      <div className="flex justify-center items-start flex-col lg:w-3/5 sm:w-full z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-Text-Black font-inter">
          One app. <br /> One banking.
        </h2>

        <div className="flex justify-center items-center z-10 sm:hidden w-full mt-4">
          <Image
            src={oneapp}
            alt="oneapp"
            height={150}
            width={150}
            className=""
          />
        </div>

        <div className="grid sm:grid-cols-2 mt-10 gap-4 sm:gap-8 justify-center w-full items-center">
          {jsonData.map((item, index) => (
            <div
              key={index}
              className="flex h-48 text-justify flex-col items-start justify-start gap-2 border-2 border-Text-Grey-Light rounded-lg p-4"
            >
              <Image src={item.icon} width={50} height={50} />
              <div className="">
                <h3 className="text-lg lineUp font-inter font-semibold font-poppins">
                  {item.title}
                </h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center flex-col items-center lg:w-2/5 sm:w-1/3 max-sm:h-[25vh] z-10 max-sm:hidden">
        <Image
          src={oneapp}
          alt="oneapp"
          height={250}
          width={250}
          className=""
        />
      </div>
    </div>
  );
}
