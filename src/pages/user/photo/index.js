import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { captureImageGuide, faceVerificationGuide } from "../../../constants";
import axios from "axios";
import {
  correct,
  correcticon,
  incorrect,
  incorrecticon,
} from "../../../assets";
import { Inter } from "next/font/google";
import CameraComponent from "@/components/CameraComponent";
import { useRouter } from "next/router";
import Confetti from "react-confetti";

const inter = Inter({ subsets: ["latin"] });

export default function KYCProcess() {
  const [step, setStep] = useState("tutorial");

  const handleContinue = () => {
    setStep("livephoto");
  };

  return (
    <div className="min-h-screen w-full flex justify-start items-center gap-4 px-4 md:px-32">
      {step === "tutorial" && <Tutorial onContinue={handleContinue} />}

      {step === "livephoto" && <Livephoto />}
    </div>
  );
}

function Tutorial({ onContinue }) {
  return (
    <div className="min-h-[90vh] w-full flex justify-start items-center gap-4 md:px-12">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-4xl md:text-5xl font-bold text-Text-Black font-inter">
          How?
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-Text-Black font-inter">
          Live Photograph
        </h2>

        <div className="w-64 mx-12 mt-6 flex flex-row justify-center items-center gap-12 sm:hidden">
          <div className="flex flex-col items-center">
            <Image src={correct} alt="correct" />
            <Image src={correcticon} alt="correcticon" />
            <div className="font-poppins text-sm md:text-xl">
              Correct Upload
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image src={incorrect} alt="incorrect" />
            <Image src={incorrecticon} alt="incorrecticon" />
            <div className="font-poppins text-sm md:text-xl">
              Incorrect Upload
            </div>
          </div>
        </div>

        <div className="font-poppins shadow-md bg-lightBg rounded-xl p-6 w-full flex flex-col justify-start items-start mt-6">
          <p className="text-black font-bold">
            Quick Face Verification Guide in 4 Steps
          </p>
          {faceVerificationGuide.map((step, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-black font-semibold">{step.step}</h3>
              <p className="text-black">
                <span className="mr-2">•</span>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={onContinue}
            className="px-4 sm:px-6 py-3 mt-4 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="w-1/2 flex flex-row justify-end items-center gap-12 max-sm:hidden">
        <div className="flex flex-col items-center">
          <Image src={correct} alt="correct" />
          <Image src={correcticon} alt="correcticon" />
          <div className="font-poppins ">Correct Upload</div>
        </div>

        <div className="flex flex-col items-center">
          <Image src={incorrect} alt="incorrect" />
          <Image src={incorrecticon} alt="incorrecticon" />
          <div className="font-poppins ">Incorrect Upload</div>
        </div>
      </div>
    </div>
  );
}
function Livephoto() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userImage: null,
  });
  const [showError, setShowError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [kycVerified, setKycVerified] = useState(false);

  const handleImageCapture = (imageData) => {
    setFormData({ ...formData, userImage: imageData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("isImageValid"));
    if (localStorage.getItem("isImageValid") === true) {
      return alert("Image not matching with official document");
    }
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.patch(
        `https://trustflow-backend.onrender.com/v1/userAuth/updateKYC/${userId}`,
        {
          isKYC: true,
        }
      );
      console.log(response);
      if (response.data.success === true) {
        localStorage.setItem("isKYC", "true");
        setKycVerified(true);
        setShowConfetti(true); // Show confetti on success
        setTimeout(() => {
          router.push("/user");
        }, 2000); // Redirect after 2 seconds
      } else {
        localStorage.setItem("isKYC", "false");
        alert("KYC failed. Please try again.");
      }
    } catch (error) {
      setShowError(true);
      console.error("Error updating KYC:", error);
    }
  };

  return (
    <div className="min-h-[90vh] w-full flex justify-start items-center gap-4 md:px-12 ">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h2 className="text-4xl md:text-5xl font-bold text-Text-Black font-inter">
          Take a photo
        </h2>

        {/* Your capture image guide here */}
        <div className="font-poppins shadow-md bg-lightBg rounded-xl p-6 w-full flex flex-col justify-start items-start mt-2">
          <p className="text-black font-bold">
            Capture a Perfect Photo in 3 Simple Steps:
          </p>
          {captureImageGuide.map((step, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-black font-semibold">{step.step}</h3>
              <p className="text-black">
                <span className="mr-2">•</span>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="w-64 mx-12 mt-6 flex flex-row justify-center items-center gap-12 sm:hidden">
          <CameraComponent onCapture={handleImageCapture} />
        </div>

        {kycVerified ? (
          <KYCDone />
        ) : (
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit}
              disabled={!localStorage.getItem("isImageValid")}
              className="px-4 sm:px-6 py-3 mt-6 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              Submit your KYC
            </button>
          </div>
        )}
      </div>

      <div className="w-1/2 flex flex-row justify-end items-center gap-12 max-sm:hidden">
        <CameraComponent onCapture={handleImageCapture} />
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}

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

const KYCDone = () => (
  <div className="flex justify-center items-center text-2xl font-bold text-green-500">
    KYC Verified!
  </div>
);
