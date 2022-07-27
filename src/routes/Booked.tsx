import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";

import { FormData } from "../types";
import Header from "../components/Header";

import { useNavigate, useLocation } from "react-router-dom";

export default function Booked() {
  let navigate = useNavigate();
  let location = useLocation();

  const { setFieldValue } = useFormikContext<FormData>();
  const { loadPageSchema } = useSchemaContext();

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryBtnStyles =
    "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  const secondaryBtnStyles =
    "flex mt-5 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-figOrange tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";
    
  return (
    <div className="relative bg-figGray-300 h-fit lg:h-screen">
      <Header />
      <div className="h-full bg-image-booked lg:h-fit bg-figGray-300 flex flex-col justify-start py-3 px-3 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-end">
        {/* Image container */}
        {/* <div className="lg:flex lg:flex-col lg:justify-end man-phone-lg lg:min-h-[640px] lg:min-w-[535px]"></div> */}

        {/* White area */}
        <div className="bg-white lg:mt-16 lg:mb-16 min-h-[500px] lg:min-w-[630px] form-content-booked">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
            <h1 className="text-4xl mb-7 tracking-wide font-Playfair">
              Your discovery call has been booked
            </h1>
            <p className="md:inline-block pl-2 lg:ml-0 booked-date font-Montserrat">
              June 10 | 9:30AM
            </p>
            <p className="md:inline-block pl-2 mb-2 lg:ml-0 booked-ar font-Montserrat">
              With Robyn Ziemba
            </p>
            <p className="md:inline-block pl-2 mb-2 lg:ml-0 booked-desc font-Montserrat">
              Robyn will give you a call at the phone number you provided
            </p>

            {/* Form fields */}
            <div>
              <div className="grid md:grid-cols-2 md:grid-rows-1 mb-7 ml-7 mr-7 lg:mr-0 lg:ml-0">
                <div className="md:mr-6">
                  <button
                    className={`${secondaryBtnStyles}`}
                    onClick={() => {}}
                  >
                    CHANGE PHONE
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`${secondaryBtnStyles}`}
                    onClick={() => {}}
                  >
                    RESCHEDULE
                  </button>
                </div>
              </div>
              <button
                className={`${primaryBtnStyles}`}
                onClick={() => {}}
              >
                ADD TO MY CALENDAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
