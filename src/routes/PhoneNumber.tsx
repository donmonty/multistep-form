import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import InputField from "../components/InputField";
import { phoneMask } from "../components/masks";
import SelectFieldCustom from "../components/SelectFieldCustom";


export default function PhoneNumber() {
  let navigate = useNavigate();
  let location = useLocation();

  const { validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/confirmation-code";

  const handleSubmission = async () => {
    await handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema });
    // await submitForm();
    // navigate("/confirmation");
  };

  // const setButtonStatus = () => {
  //   if (values.phoneNumber === "" || errors.phoneNumber) {
  //     return true;
  //   }
  //   return false;
  // };

  const aboutUsOptions = [
    { key: "socialMedia", value: "Social media" },
    { key: "other", value: "Other" },
  ];

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-figGray-300 h-screen lg:h-screen">
      <div className="w-full p-4 h-16 bg-white"></div>
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end woman-phone-lg lg:min-h-[640px] lg:min-w-[525px]"></div>

        {/* White area */}
        <div className="bg-white woman-phone-xs woman-phone-md woman-phone-none lg:mt-16 lg:mb-16 min-h-[500px] lg:min-w-[630px] lg:max-w-[630px]">
          <div className="flex flex-col py-20 px-10 lg:py-12 lg:px-20">
            <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">Lastly!</p>
            <h1 className="text-4xl font-extrabold mb-7">Phone number for your discovery call</h1>
            <p className="md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:ml-0">Where should we call you?</p>


            {/* Form fields */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 lg:gap-x-2 place-items-stretch">

              <InputField
                name="phoneNumber"
                label="Your phone number"
                required={true}
                mask={phoneMask}
              />
              <SelectFieldCustom
                name="aboutUs"
                label="How did you hear about us?"
                options={aboutUsOptions}
              />

              <button
                className={`${primaryBtnStyles} mt-0 xs:mb-12 lg:my-0`}
                onClick={() => {
                  handleSubmission();
                  // navigate("/session-booked");
                }}
              >
                NEXT
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}