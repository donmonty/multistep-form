import React, { useEffect } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";

import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import ImageUploadField from "../components/FileUploadField";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export default function InsuranceCard() {
  let navigate = useNavigate();
  let location = useLocation();

  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/phone-number";

  // const setButtonStatus =() => {
  //   if (
  //     values.insuranceCardFront === "" ||
  //     values.insuranceCardBack === "" ||
  //     errors.insuranceCardFront ||
  //     errors.insuranceCardBack
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mt-4 mb-3";

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-4">Your insurance card</h1>
          <p className="mb-3 text-sm">Upload the front and the back of your insurance card so your insurance verifies how many free sessions you have covered.</p>
          <ImageUploadField
            label="Front of the card"
            name="insuranceCardFront"
          />
          <ImageUploadField
            label="Back of the card"
            name="insuranceCardBack"
          />
        </div>
        <button
          className={buttonStyles}
          // disabled={setButtonStatus()}
          onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
          // onClick={() => {
          //   navigate("/phone-number");
          // }}
        >
          Next
      </button>
      </div>
    </div>
  );
}