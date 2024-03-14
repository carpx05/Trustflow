import React, { useState } from "react";
import AccordionUI from "./accordionUI";

const Accordion = () => {
  const [Index, setIndex] = useState(false);

  const data = [
    {
      id: 1,
      question: "What is Video KYC?",
      answer:
        "Video KYC (Know Your Customer) is an online interactive process used to verify the identity of individuals remotely. It involves capturing the user's live photograph and collecting their basic details such as name, date of birth, address, PAN card/Aadhaar, signature, income range, and type of employment through a video call.",
    },
    {
      id: 2,
      question: "Why is Video KYC important?",
      answer:
        "Video KYC is important as it provides a convenient and secure method for verifying the identity of individuals remotely. It eliminates the need for physical presence and paperwork, making the KYC process more efficient and accessible. Additionally, it enhances security measures and helps in preventing fraudulent activities.",
    },
    {
      id: 3,
      question: "How does Video KYC work?",
      answer:
        "Video KYC works by enabling individuals to complete the KYC process through a video call with a representative of the organization. During the call, the user is required to present their live photograph and provide the necessary information in a conversational manner. The representative verifies the details provided and completes the KYC process.",
    },
    {
      id: 4,
      question: "Is Video KYC secure?",
      answer:
        "Yes, Video KYC is designed to be secure and compliant with regulatory requirements. It employs encryption protocols to protect sensitive information exchanged during the video call. Additionally, stringent authentication measures are implemented to verify the identity of both the user and the representative conducting the KYC process.",
    },
    {
      id: 5,
      question: "How does Video KYC ensure inclusivity?",
      answer:
        "Video KYC ensures inclusivity by providing a user-friendly and intuitive interface that can be accessed by individuals across different demographics and language preferences. It accommodates users with varying levels of education and financial literacy, ensuring that the KYC process is accessible to all.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center p-10 rounded-xl h-auto py-20 bg-lightBg">
      <h1 className="text-center text-3xl font-bold mb-6">FAQ</h1>
      {data.map((data) => {
        return (
          <AccordionUI
            title={data.question}
            Id={data.id}
            children={data.answer}
            Index={Index}
            setIndex={setIndex}
          ></AccordionUI>
        );
      })}
    </div>
  );
};
export default Accordion;
