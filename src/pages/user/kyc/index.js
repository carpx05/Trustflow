import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UnAuth from "@/components/UnAuth";
import KycDone from "@/components/KycCompleted";

// Define your KYC component here
function KYCPage() {
  const router = useRouter();

  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    annualIncome: "",
    aadharNumber: "",
    panNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, signature: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `https://trustflow-backend.onrender.com/v1/userAuth/checkUserData/${userId}`,
        {
          username: formData.name,
          dateOfBirth: formData.dob,
          aadhaarCardNo: formData.aadharNumber,
          panCardNo: formData.panNumber,
        }
      );
      console.log(response);
      if (response.data.success === true) {
        localStorage.setItem("isKYC", true);
        router.push("/user/photo");
      } else {
        setShowError(true);
      }

      setFormData({
        name: "",
        dob: "",
        address: "",
        annualIncome: "",
        aadharNumber: "",
        panNumber: "",
      });
    } catch (error) {
      console.error("Error submitting KYC data:", error);
    }
  };

  return (
    <div className="flex justify-center w-full px-[2rem] xl:px-[4rem] min-h-[90vh] py-[2rem]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full w-full gap-y-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-Text-Black font-inter">
          Details
        </h2>
        <section className="h-full flex flex-col lg:flex-row justify-evenly items-center gap-4 w-full">
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:gap-y-12 max-md:justify-items-center md:grid-cols-2 w-full lg:w-[75vw]">
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="name"
                className="font-semibold text-Text-Black font-poppins"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="dob"
                className="font-semibold text-Text-Black font-poppins"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
                placeholder="Select your date of birth"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="aadharNumber"
                className="font-semibold text-Text-Black font-poppins"
              >
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                id="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
                placeholder="Enter your Aadhar number"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="panNumber"
                className="font-semibold text-Text-Black font-poppins"
              >
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                id="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
                placeholder="Enter your PAN number"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="annualIncome"
                className="font-semibold text-Text-Black font-poppins"
              >
                Annual Income
              </label>
              <select
                name="annualIncome"
                id="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
              >
                <option value="" style={{ fontSize: "0.9rem" }}>
                  Select annual income range
                </option>
                <option value="0-1,00,000" style={{ fontSize: "0.9rem" }}>
                  0 - 5,00,000
                </option>
                <option
                  value="1,00,001-5,00,000"
                  style={{ fontSize: "0.9rem" }}
                >
                  0 - 5,00,000
                </option>
                <option
                  value="5,00,001-10,00,000"
                  style={{ fontSize: "0.9rem" }}
                >
                  5,00,001 - 10,00,000
                </option>
                <option
                  value="10,00,001-20,00,000"
                  style={{ fontSize: "0.9rem" }}
                >
                  5,00,001 - 10,00,000
                </option>
                {/* Add other options as needed */}
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="employmentType"
                className="font-semibold text-Text-Black font-poppins"
              >
                Type of Employment
              </label>
              <select
                name="employmentType"
                id="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                required
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
              >
                <option
                  value=""
                  className="font-poppins"
                  style={{ fontSize: "0.9rem" }}
                >
                  Select employment type
                </option>
                <option
                  value="business"
                  className="font-poppins"
                  style={{ fontSize: "0.9rem" }}
                >
                  Business
                </option>
                <option
                  value="job"
                  className="font-poppins"
                  style={{ fontSize: "0.9rem" }}
                >
                  Job
                </option>
                <option
                  value="job"
                  className="font-poppins"
                  style={{ fontSize: "0.9rem" }}
                >
                  Self Employed
                </option>
                {/* Add other options as needed */}
              </select>
            </div>
          </div>
          <div className="h-full w-full lg:w-[25vw] flex lg:flex-col gap-6 md:gap-10 flex-col md:flex-row items-center">
            <div className="flex flex-col gap-y-1">
              <label
                htmlFor="signature"
                className="font-semibold text-Text-Black font-poppins"
              >
                Signature
              </label>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                name="signature"
                id="signature"
                onChange={handleSignatureChange}
                className="input-field bg-inputBg p-3 rounded-xl w-72 md:w-[350px] lg:w-80 xl:w-96 shadow-md font-poppins"
              />
              {formData.signature && (
                <img
                  src={URL.createObjectURL(formData.signature)}
                  alt="Signature"
                  className="mt-2 max-w-[200px] max-h-[200px]"
                />
              )}
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="px-4 w-64 md:px-6 py-3 font-inter bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              >
                Continue
              </button>
            </div>
          </div>
        </section>
      </form>
      {/* Error Popup */}
      {showError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 p-4 rounded-md">
          <p className="text-red-700">
            KYC failed. Incorrect details. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}

export default function KYCWrapper() {
  const [userId, setUserId] = useState(null);
  const [isKYC, setIsKYC] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedIsKYC = localStorage.getItem("isKYC");

    if (storedUserId) {
      setUserId(storedUserId);
    }

    if (storedIsKYC === "true") {
      setIsKYC(true);
    }
  }, []);

  // Logic to determine which component to render
  if (!userId || userId === "undefined" || userId === "null") {
    return <UnAuth />;
  } else if (isKYC) {
    return <KycDone />;
  } else {
    return <KYCPage />;
  }
}
