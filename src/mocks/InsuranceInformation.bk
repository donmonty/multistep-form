import React, { useEffect, useState } from "react";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";

import { FormData } from "../types";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import RadioGroup from "../components/RadioGroup";
import InputField from "../components/InputField";
import BirthdateField from "../components/BirthdateField";
import { dateOfBirthMask } from "../components/masks";
import SelectField from "../components/SelectField";
import { handleNav } from "../lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export default function PolicyInfo() {
  let navigate = useNavigate();
  let location = useLocation();

  const [isPolicyHolderVisible, setIsPolicyHolderVisible] = useState(false);

  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const isPolicyHolder = [
    { key: "yes", value: "Yes" },
    { key: "no", value: "No" },
  ];
  const states = [
    { key: "CA", value: "CA" },
    { key: "AZ", value: "AZ" },
    { key: "TX", value: "TX" },
  ];
  const insuranceCompanies = [
    { key: "company a", value: "Company A"},
    { key: "company b", value: "Company B"},
    { key: "company c", value: "Company C"},
  ];

  const nextStep = "/insurance-card";

  const handlePolicyHolderVisible = (e: any) => {
    const value = e.target.value;
    console.log(value);
    if (value.toLowerCase() === "yes") {
      setIsPolicyHolderVisible(false);
    } else {
      setIsPolicyHolderVisible(true);
    }
    setFieldValue("isPolicyHolder", value.toLowerCase());
  };

  const buttonStyles = "flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 mb-3 w-80";

  useEffect(() => {
    loadPageSchema(location.pathname, values.isPolicyHolder.toLowerCase());
  }, [values.isPolicyHolder]);

  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div className="mb-4">
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-4">Policy info</h1>
          <p className="mb-3 text-sm font-bold">Are you the policy holder?</p>
          <RadioGroup
            name="isPolicyHolder"
            label="Are you the policy holder?"
            align="horizontal"
            options={isPolicyHolder}
            handleChange={handlePolicyHolderVisible}
          />
          {isPolicyHolderVisible ? (
            <div>
              <InputField
                name="policyHolderFirstName"
                label="Policy holder's first name"
                required={true}
              />
              <InputField
                name="policyHolderLastName"
                label="Policy holder's last name"
                required={true}
              />
              <BirthdateField
                name="policyHolderBirthDate"
                label="Policy holder's DOB"
                mask={dateOfBirthMask}
              />
              <InputField
                name="policyHolderAddress"
                label="Policy holder's address"
                required={true}
              />
              <InputField
                name="policyHolderCity"
                label="City"
                required={true}
              />
              <SelectField
                name="policyHolderState"
                label="State"
                options={states}
              />
              <SelectField
                name="insuranceCompany"
                label="Insurance company"
                options={insuranceCompanies}
              />
            </div>
          ): null}
        </div>
        <button
          className={buttonStyles}
          onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
        >
          Next
        </button>
      </div>
    </div>
  );
}