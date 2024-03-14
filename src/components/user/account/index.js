import { account, app, google, apple, tick } from "../../../assets";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Account() {
  return (
    <div className="flex flex-col justify-center items-center p-10 rounded-xl h-auto py-20">
      <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 font-inter">
        Perfect Card <br /> for your needs.
      </h1>
      <p className="max-w-[600px] font-poppins">
        Discover perfection in every swipe with our card tailored to meet your
        unique needs. Elevate your experience with the perfect card for seamless
        transactions.
      </p>
      <Image
        src={account}
        alt="account"
        className="w-96 h-80 mt-8 object-contain"
      />
      <div className="mt-8 space-x-4">
        <button className="px-4 sm:px-6 py-3 font-poppins bg-blue hover:bg-lightBg text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
          Open Account
        </button>
        <button className="px-4 sm:px-6 py-3 font-poppins bg-lightBg hover:bg-blue text-black hover:text-white rounded-lg focus:outline-none focus:ring focus:ring-gray-500">
          Compare Prices
        </button>
      </div>
      <div className="mt-8 bg-[#EFF7FF] max-w-[1200px] w-full">
        <div className="flex flex-row px-8 xl:px-28 xl:gap-80">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold mt-8 font-inter">
              One app. <br /> One banking.
            </h1>
            <p className="md:max-w-[500px] font-semibold mt-4 font-inter">
              Unify your finances with Trustflow where simplicity meets
              security. Experience seamless banking, all in one app. One app.
              One banking. Effortless and secure.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <Image
                  src={tick}
                  alt="account"
                  className="w-8 h-8 object-contain mr-2"
                />
                <p>Instant transactions</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={tick}
                  alt="account"
                  className="w-8 h-8 object-contain mr-2"
                />
                <p>Payments worldwide</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={tick}
                  alt="account"
                  className="w-8 h-8 object-contain mr-2"
                />
                <p>Saving accounts</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={tick}
                  alt="account"
                  className="w-8 h-8 object-contain mr-2"
                />
                <p>100% mobile KYC</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={apple}
                  alt="apple"
                  className="w-32 h-32 object-contain mr-2"
                />
              </div>
              <div className="flex items-center">
                <Image
                  src={google}
                  alt="google"
                  className="w-32 h-32 object-contain mr-2"
                />
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-end items-end">
            <Image
              src={app}
              alt="account"
              className="w-96 h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
