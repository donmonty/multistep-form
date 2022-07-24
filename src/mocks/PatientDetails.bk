import React, { useEffect } from "react";

import InputField from "../components/InputField";
import SelectFieldCustom from "../components/SelectFieldCustom";
import { ChevronLeftIcon } from '@heroicons/react/solid';

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

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";
  
  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-8">Patient details</h1>

          <InputField name="patientFirstName" label="Patient's first name" required={true}/>
          <InputField name="patientLastName" label="Patient's last name" required={true}/>
          <BirthdateField
            name="patientBirthDate"
            label="Patient's date of birth"
            mask={dateOfBirthMask}
          />
          <InputField name="patientEmail" label="Patient's email"required={true}/>
          <SelectFieldCustom
            name="patientRelationship"
            label="Relatonship with patient"
            options={patientRelationships}
          />
        </div>

        <button
          className={buttonStyles}
          onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
          // disabled={validateEmptyFields()}
          // onClick={() => {
          //   navigate("/user-details");
          // }}
        >
          Next
        </button>
      </div>
    </div>
  );
}