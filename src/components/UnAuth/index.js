import React from "react";
import Image from "next/image";
import Link from "next/link";
import unAuth from "../../assets/unAuth.svg";
export default function UnAuth() {
  return (
    <section className="w-full flex flex-col-reverse sm:flex-row justify-between items-center px-4 md:px-8 lg:px-16 xl:px-20 h-[90vh] pb-10">
      <div className="flex flex-col justify-start items-start gap-0">
        <h2 className="text-4xl md:text-6xl font-semibold text-Text-Black font-inter">
          Unauthorized User
        </h2>

        <p className="text-black font-bold sm:mt-12 mt-4 text-justify">
          You have not signed in the portal, first sign in and follows the link:
        </p>
        <div className="flex justify-end w-full sm:justify-start items-center ">
          <Link href={"/"}>
            <button
              type="button"
              className="w-48 px-4 sm:px-6 py-3 mt-6 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
      <div>
        <Image src={unAuth} alt="Unauthorized User" height="400" width="400" />
      </div>
    </section>
  );
}
