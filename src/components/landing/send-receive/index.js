import React from "react";
import { money, sendReceive } from "../../../constants";
import Image from "next/image";
import { tick, icon } from "../../../assets";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SendReceive() {
  return (
    <div className="flex min-h-[60vh] bg-blueBg w-full items-center justify-center lg:px-[8rem] md:px-[4rem] p-2 mt-16">
      <div className="flex lg:justify-center justify-center items-center lg:items-start flex-col lg:w-3/5 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-Text-Black font-inter">
          Send & receive <br />
          money instantly
        </h2>
        <p className="text-justify font-normal text-Text-Grey-Light mt-[1.5rem] text-sm sm:w-2/3 font-poppins">
          Now your money is in good hands as trustflow guarantees a great
          journey.
        </p>

        <div className="grid grid-cols-1 gap-2 mt-[2rem] font-poppins">
          {money.map((item, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <Image src={tick} alt="tick" className="h-8 w-8" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-1 mt-[1.5rem] lg:w-2/5 sm:w-1/3 gap-5 ">
        {sendReceive.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-72 bg-white p-2 font-poppins"
          >
            <div className="flex justify-center items-center gap-2">
              <Image src={icon} alt="icon" width={40} height={40} />
              <p className="text-sm">{item.title}</p>
            </div>
            <div className="text-sm">{item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
