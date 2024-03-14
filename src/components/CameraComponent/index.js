import React, { useRef, useState } from "react";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CameraComponent = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setCapturedImage(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    onCapture(imageData);

    // Call the function to upload the image to S3
    const imgKey = await uploadToS3(imageData);
    if (imgKey) {
      onCapture(imgKey); // Pass the imageUrl to the onCapture function

      // Call PATCH API to update KYC with imageUrl
      const userId = localStorage.getItem("userId");
      try {
        const isImageUpload = await axios.post(
          `https://trustflow-backend.onrender.com/v1/image/processImage/${userId}`,
          { imgKey }
        );

        console.log(isImageUpload);
        if (isImageUpload.data.body.match) {
          setUploadMessage("Image uploaded successfully");
          console.log("KYC updated successfully");
          localStorage.setItem("isImageValid", !isImageUpload.data.body.match);
        } else {
          setUploadMessage("Image not matching with official document");
          localStorage.setItem("isImageValid", !isImageUpload.data.body.match);
        }
      } catch (error) {
        console.error("Error updating KYC:", error);
        setUploadMessage("The image is not Valid");
      }
    } else {
      setUploadMessage("Failed to upload image");
    }
  };

  const uploadToS3 = async (imageData) => {
    const s3 = new AWS.S3({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });

    const fileData = Buffer.from(
      imageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `${uuidv4()}.png`, // Generate a unique key for the image
      Body: fileData,
      ContentType: "image/png",
    };

    try {
      const data = await s3.upload(params).promise();
      console.log("File uploaded to S3:", data.Key);
      return data.Key; // Return the S3 URL
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      return null;
    }
  };

  return (
    <div className="border border-gray-500 rounded-md p-4">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="w-72 h-auto" />
          ) : (
            <video ref={videoRef} autoPlay muted className="w-72 h-auto" />
          )}
        </div>
        <div className="flex flex-row">
          <button
            onClick={startCamera}
            className="btn-primary mr-2 px-4 sm:px-6 py-2 mt-6 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            disabled={stream !== null}
          >
            Start
          </button>
          <button
            onClick={stopCamera}
            className="btn-primary mr-2 px-4 sm:px-6 py-2 mt-6 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Stop
          </button>
          <button
            onClick={captureImage}
            className="btn-primary px-4 sm:px-6 py-2 mt-6 font-poppins bg-blue shadow-md text-white hover:text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          >
            Capture
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {uploadMessage && (
          <p className="font-poppins mt-4 text-center">{uploadMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
