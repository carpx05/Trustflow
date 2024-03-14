import React from "react";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

const AccordionUI = ({ title, children, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => Index !== Id && setIndex(Id);
  const handleCloseAccordion = (e) => {
    e.stopPropagation();
    setIndex(null);
  };

  return (
    <>
      <div
        onClick={() => handleSetIndex(Id)}
        className="flex group cursor-pointer w-3/4 mx-auto h-16 justify-between items-center p-2 mt-2 rounded-md bg-white hover:bg-blue hover:shadow-lg "
      >
        <div className="flex group cursor-pointer">
          <div className="text-black font-semibold pl-10 group-hover:text-white">
            {title}
          </div>
        </div>
        <div className="flex items-center justify-center pr-10">
          {Index !== Id ? (
            <GoPlus className="w-6 h-6 group-hover:text-white text-blue" />
          ) : (
            <IoCloseOutline
              className="w-6 h-6 group-hover:text-white text-blue cursor-pointer"
              onClick={(e) => handleCloseAccordion(e)}
            />
          )}
        </div>
      </div>

      {Index === Id && (
        <div className="bg-white pl-10 font-semibold text-gray-500 w-3/4 h-auto rounded-md p-4 border-l-2 border-blue mb-2 ">
          {children}
        </div>
      )}
    </>
  );
};

export default AccordionUI;
