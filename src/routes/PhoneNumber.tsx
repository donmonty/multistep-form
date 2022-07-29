import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { FormData } from "../types";
import Header from "../components/Header";
import WomanPhone from "../images/woman-phone-half.png";

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

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-semibold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-figGray-300 h-fit lg:h-screen">
      <Header />
      <div className="woman-phone-lg h-fit lg:h-fit bg-none flex flex-col justify-start pb-3 pt-3 px-2 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-end ">

        {/* Image container */}
        {/* <div className="lg:flex lg:flex-col lg:justify-end woman-phone-lg lg:min-h-[640px] lg:min-w-[525px]"></div> */}

        {/* White area */}
        <div className="bg-white  woman-phone-md woman-phone-none lg:h-[77vh] lg:ml-14 lg:mr-20 lg:mt-16 lg:mb-16 lg:max-h-[500px] lg:min-w-[630px] lg:max-w-[630px]">
          <div className="flex flex-col py-20 px-10 lg:py-12 lg:px-20">
            <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl xs:text-left lg:text-center">Step 5 of 5</p>
            <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-4 md:mb-7 xs:text-left lg:text-center">We're almost done</h1>
            <p className="md:inline-block md:max-w-[400px] pr-10 md:pr-0 mb-8 font-CapriSans text-black tracking-wider lg:ml-0 xs:text-left lg:text-center">Provide the best mobile phone number to reach you. You will get a confirmation code via SMS.</p>


            {/* Form fields */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-2 lg:gap-x-2 place-items-stretch z-10">

              <InputField
                name="phoneNumber"
                label="Mobile phone number"
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

        <div>
          <img
            src={WomanPhone}
            alt=""
            className="woman-phone-xs-bg"
          />
        </div>     
      </div>
    </div>
  );
}