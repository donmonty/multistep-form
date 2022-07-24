import React, { useEffect } from "react";

import InputField from "../components/InputField";
import SelectFieldCustom from "../components/SelectFieldCustom";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { dateOfBirthMask } from "../components/masks";
import { FormData } from "../types";
import { handleNav } from "../lib/utils";
import BirthdateField from "../components/BirthdateField";

const patientRelationships = [
  { key: "dependant", value: "Dependant" },
  { key: "other", value: "Other" },
];

export default function PatientDetails() {

  let navigate = useNavigate();
  let location = useLocation();

  const { values, setFieldValue, validateForm, setTouched, errors } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/select-time";

  // const validateEmptyFields = () => {
  //   if (
  //     values.patientFirstName === "" ||
  //     values.patientLastName === "" ||
  //     values.patientEmail === "" ||
  //     values.patientBirthDate === "" ||
  //     errors.patientFirstName ||
  //     errors.patientLastName ||
  //     errors.patientEmail ||
  //     errors.patientBirthDate
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";
  
  return (
    <div className="relative bg-figGray-300 h-screen">
      <div className="w-full p-4 h-16 bg-white"></div>
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-8 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end hands-lg lg:min-h-[640px] lg:min-w-[540px]"></div>

        {/* White area */}
        <div className="bg-white">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
          <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">step 3 of 5</p>
          <h1 className="text-4xl font-extrabold mb-7">Patient details</h1>

          <p className="xs:hidden md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:ml-0">Please give us a few details about the patient</p>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 lg:grid-cols-2 place-items-stretch">

            <InputField name="patientFirstName" label="Patient's first name" required={true}/>
            <InputField name="patientLastName" label="Patient's last name" required={true}/>
            <BirthdateField
              name="patientBirthDate"
              label="Patient's date of birth"
              mask={dateOfBirthMask}
            />
            <InputField name="patientEmail" label="Patient's email"required={true}/>

            <div className="lg:col-span-2">
              <SelectFieldCustom
                name="patientRelationship"
                label="Relatonship with patient"
                options={patientRelationships}
              />
            </div>

            <button
              className={`${primaryBtnStyles} lg:col-span-2`}
              onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
            >
              Next
            </button>
          </div>

          </div>
        </div>

      </div>
    </div>
  );
}