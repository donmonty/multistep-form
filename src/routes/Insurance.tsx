import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";

import { FormData } from "../types";
import Header from "../components/Header";

import { useNavigate, useLocation } from "react-router-dom";

export default function Insurance() {
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

  return (
    <div className="relative bg-figGray-300 h-fit lg:h-screen">
      <Header />
      <div className="h-full bg-image-insurance lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-end">
        {/* Image container */}
        {/* <div className="lg:flex lg:flex-col lg:justify-end man-phone-lg lg:min-h-[640px] lg:min-w-[535px]"></div> */}

        {/* White area */}
        <div className="bg-white  lg:mt-16 lg:mb-16 min-h-[500px] lg:min-w-[630px] form-content-right">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
            <p className="mb-5 font-CapriSans text-figGray-600 lg:text-xl lg:text-center">
              Step 3 of 5
            </p>
            <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7 lg:text-center">
              We partner with insurance
            </h1>
            <p className="md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:ml-0 lg:text-center">
              Is any of the following your provider?
            </p>

            {/* Form fields */}
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 lg:grid-cols-4 lg:gap-x-2 place-items-stretch">
              <div className="p-6 bg-figGray-200"></div>
              <div className="p-6 bg-figGray-200"></div>
              <div className="p-6 bg-figGray-200"></div>
              <div className="p-6 bg-figGray-200"></div>
              <div className="p-6 bg-figGray-200 lg:col-start-2 lg:col-end-3"></div>
              <div className="p-6 bg-figGray-200 lg:col-start-3 lg:col-end-4"></div>

              <button
                className={`${primaryBtnStyles} xs:py-1 xs:mt-40 leading-4 text-xs col-span-3 lg:col-span-4 lg:mt-14 lg:h-[44px] lg:py-3`}
                onClick={() => {
                  setFieldValue("hasInsurance", "yes");
                  navigate("/insurance-information");
                }}
              >
                I HAVE ONE OF THE INSURANCES ABOVE
              </button>
              <button
                type="submit"
                className={`${primaryBtnStyles} xs:py-2 text-xs mt-0 col-span-3 lg:col-span-4 lg:mt-0 h-[44px] lg:py-1`}
                onClick={() => {
                  setFieldValue("hasInsurance", "other");
                  navigate("/insurance-information");
                }}
              >
                <div>
                  <span>I HAVE AN INSURANCE NOT LISTED</span>
                  <span className="xs:hidden lg:block font-Montserrat font-normal text-xs">
                    *check if you're out of network benefits
                  </span>
                </div>
              </button>
              <button
                className={`${primaryBtnStyles} xs:py-1 leading-4 text-xs mt-0 col-span-3 lg:col-span-4 lg:mt-0 lg:h-[44px] lg:py-3`}
                onClick={() => {
                  setFieldValue("hasInsurance", "no");
                  navigate("/stripe-card");
                }}
              >
                CONTINUE WITHOUT INSURANCE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
