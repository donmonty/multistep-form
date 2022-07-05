import React, { useEffect } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3";

export default function Confirmation() {
  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div className="h-screen bg-gray-100 py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-full flex flex-col justify-between">
        <h1 className="text-3xl font-extrabold mb-4">Your session has been booked!</h1>
        <div>
          <button className={buttonStyles}>Add to my calendar</button>
          <button className={buttonStyles}>Have a question?</button>
        </div>
      </div>
    </div>
  );
}