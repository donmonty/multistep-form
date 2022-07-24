import React, { useEffect } from "react";

import InputField from "../components/InputField";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import SelectFieldCustom from "../components/SelectFieldCustom";
import { FormData } from "../types";
import { handleNav } from "../lib/utils";

import { dateOfBirthMask } from "../components/masks";
import BirthdateField from "../components/BirthdateField";

const states = [
  { key: "CA", value: "CA" },
  { key: "AZ", value: "AZ" },
  { key: "TX", value: "TX" },
];

export default function YourDetails() {
  let navigate = useNavigate();
  let location = useLocation();

  const { validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/patient-details";

  useEffect(() => {
    loadPageSchema(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  return (
    <div className="relative bg-figGray-300 h-screen">
      <div className="w-full p-4 h-16 bg-white"></div>
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-8 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* White area */}
        <div className="bg-white">
        {/* <div className="bg-white sm:mx-auto lg:mx-0 sm:w-full sm:max-w-2xl flex flex-col justify-between lg:items-stretch h-fit lg:h-fit lg:max-w-[630px] couple-xs couple-md couple-none"> */}
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
          <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">Step 2 of 5</p>
          <h1 className="text-4xl font-extrabold mb-7">Your details</h1>

          <p className="xs:hidden md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:ml-0">Select all that apply</p>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 lg:grid-cols-2 place-items-stretch">

            <InputField name="firstName" label="First name" required={true}/>
            <InputField name="lastName" label="Last name" required={true}/>
            <BirthdateField
              name="birthDate"
              label="Date of birth"
              mask={dateOfBirthMask}
            />
            <InputField name="email" label="Email" required={true}/>
            <InputField name="street" label="Street" required={true}/>
            <InputField name="city" label="City"required={true}/>
            <SelectFieldCustom
              name="state"
              label="State"
              options={states}
            />
            <InputField name="zipcode" label="Zipcode"required={true}/>

            <button
              className={`${primaryBtnStyles} lg:col-span-2`}
              onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
            >
              Next
            </button>
          </div>

          </div>
        </div>

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end couple-lg lg:min-h-[640px] lg:min-w-[540px]"></div>

      </div>
    </div>
  );

}