import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logo, accountnum, lock } from "../assets";
import Credentials from "@/components/CredentialComponent";

export default function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make POST request to API
    try {
      const response = await fetch(
        "https://trustflow-backend.onrender.com/v1/userAuth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accountNumber, password }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        // Save userId to local storage
        localStorage.setItem("userId", data.userData.userId);
        localStorage.setItem("isKYC", data.userData.isKYC);

        // Redirect user to /user route
        window.location.href = "/user";
      } else {
        setError("Wrong credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* <Credentials /> */}
      <div className="hidden md:flex flex-row h-screen">
        <div
          className="flex flex-col h-screen w-3/5 justify-center items-center relative"
          style={{
            backgroundImage: `linear-gradient(180deg, #0575E6, #02298A)`,
          }}
        >
          <Image
            src={logo}
            alt="logo"
            className="w-[266px] h-[72.14px] object-contain mix-blend-multiply"
          />
          <h1 className="font-bold text-white text-7xl tracking-wide mt-2">
            Trustflow
          </h1>

          <p className="text-white font-semibold mt-4">
            The most trusting and potential bank to put money and trust.
          </p>
        </div>

        <div className="flex flex-col w-full p-6 lg:max-w-xl justify-center items-center z-10">
          <Image
            src={logo}
            alt="hoobank"
            className="w-[266px] h-[72.14px] object-contain"
          />
          <h1 className="text-3xl font-bold text-center mt-4">Hello Again!</h1>
          <h2 className="text-xl font-semibold text-center mt-2">
            Welcome back
          </h2>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="accountNumber"
                className="block text-sm font-semibold"
              >
                Account number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-full shadow-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                style={{ minWidth: "300px" }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-full shadow-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                style={{ minWidth: "300px" }}
              />
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="flex flex-col justify-center items-center mt-6">
              <button
                className="w-full max-w-[300px] px-4 py-4 tracking-wide text-white bg-blue rounded-full focus:outline-none "
                type="submit "
                onClick={handleSubmit}
              >
                Login
              </button>
              <Link href="/" className="text-xs mt-2 hover:underline">
                Forget Password?
              </Link>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center border border-gray-500 rounded-md font-poppins mt-6 px-4">
                  <Image
                    src={accountnum}
                    alt="accountnum"
                    className="h-4 w-4 mr-2"
                  />
                  <p>123456789123</p>
                </div>
                <div className="flex items-center border border-gray-500 rounded-md font-poppins mt-6 px-4">
                  <Image src={lock} alt="password" className="h-4 w-4 mr-2" />
                  <p>password1</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden max-md:flex flex-col h-screen">
        <div
          className="flex flex-col h-screen justify-center items-center relative"
          style={{
            backgroundImage: `linear-gradient(180deg, #0575E6, #02298A)`,
          }}
        >
          <Image
            src={logo}
            alt="logo"
            className="w-[266px] h-[72.14px] object-contain mix-blend-multiply"
          />
          <div className="flex flex-col w-full p-6 lg:max-w-xl justify-center items-center">
            <h1 className="text-3xl font-bold text-center mt-4 text-white">
              Hello Again!
            </h1>
            <h2 className="text-xl font-semibold text-center mt-2 text-white">
              Welcome back
            </h2>
            <form className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-semibold text-white"
                >
                  Account number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-full focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  style={{ minWidth: "300px" }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 bg-white border rounded-full focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  style={{ minWidth: "300px" }}
                />
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <div className="flex flex-col justify-center items-center mt-6">
                <button
                  className="w-full max-w-[300px] px-4 py-2.5 tracking-wide text-white bg-blue rounded-full focus:outline-none"
                  type="submit "
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <Link
                  href="/"
                  className="text-xs mt-2 hover:underline text-white"
                >
                  Forget Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
