import React from "react";

const Card = ({ data, isActive }) => {
  return (
    <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="px-4 my-6">
        {isActive.timestamp === data.timestamp && (
          <div className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">User is online</span>
          </div>
        )}
        <p className=" font-bold capitalize text-xl">last login</p>
        <h3 className="text-lg font-semibold">
          {new Date(data.timestamp).toLocaleString()}
        </h3>{" "}
        <p className="mt-2 text-sm text-gray-400 ">
          <span className="text-xl text-black font-semibold">
            Device Information :
          </span>{" "}
          {data.device}
        </p>
        <button
          type="button"
          className="px-6 py-2 mt-4 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          {data.action}
        </button>
      </div>
    </div>
  );
};

export default Card;
