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
import SelectField from "../components/SelectField";


export default function PhoneNumber() {
  let navigate = useNavigate();
  let location = useLocation();

  const { values, setFieldValue, validateForm, setTouched, errors, submitForm } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep = "/confirmation";

  const handleSubmission = async () => {
    await handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema, submitForm });
    // await submitForm();
    // navigate("/confirmation");
  };

  const setButtonStatus = () => {
    if (values.phoneNumber === "" || errors.phoneNumber) {
      return true;
    }
    return false;
  };

  const aboutUsOptions = [
    { key: "socialMedia", value: "Social media" },
    { key: "other", value: "Other" },
  ];

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3";

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-4">Lastly</h1>
          <p className="mb-3 text-sm">Confirm the phone number for the RD to contact you on your appointment</p>
          <InputField
            name="phoneNumber"
            label="Your phone number"
            required={true}
            mask={phoneMask}
          />
          <SelectField
            name="aboutUs"
            label="How did you hear about us?"
            options={aboutUsOptions}
          />
        </div>
        <button
          type="submit"
          className={buttonStyles}
          // disabled={setButtonStatus()}
          onClick={() => {
            handleSubmission();
            // navigate("/session-booked");
          }}
        >
          Confirm and book!
      </button>
      </div>
    </div>
  );
}