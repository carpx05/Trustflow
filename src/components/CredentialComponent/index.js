import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";

const Credentials = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Array of predefined credentials
  const credentialsList = [
    { accountNumber: "1234567890", password: "password1" },
    { accountNumber: "0987654321", password: "password2" },
    // Add more sets of credentials as needed
  ];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="relative z-10">
      <button
        type="button"
        className="text-white  bg-gradient-to-r absolute top-8 left-8 z-50  from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={togglePopup}
      >
        User Cred
      </button>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">User Credentials</h2>
            <div>
              {credentialsList.map((credentials, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-1">
                      Account Number:
                    </h3>
                    <p className="text-sm font-normal mb-1">Password:</p>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="cursor-pointer text-blue-500 mr-2"
                      onClick={() => handleCopy(credentials.accountNumber)}
                    >
                      {credentials.accountNumber}
                    </span>
                    <MdContentCopy
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      onClick={() => handleCopy(credentials.accountNumber)}
                      size={30}
                    />
                  </div>
                  <div className="flex items-center ml-4">
                    <span
                      className="cursor-pointer text-blue-500 mr-2"
                      onClick={() => handleCopy(credentials.password)}
                    >
                      {credentials.password}
                    </span>
                    <MdContentCopy
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      onClick={() => handleCopy(credentials.password)}
                      size={30}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg"
              onClick={togglePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credentials;
