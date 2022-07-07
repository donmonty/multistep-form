import React, { useEffect } from "react";

import InputField from "../components/InputField";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useField, useFormikContext, FormikProps, Form } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import SelectField from "../components/SelectField";
import { FormData } from "../types";
import { handleNav } from "../lib/utils";

import {
  dateMask,
  expirationDateMask,
  monthYearMask,
  cvcMask,
  cardNumberMask,
  dateOfBirthMask,
  phoneMask,
} from "../components/masks";
import BirthdateField from "../components/BirthdateField";
import { ChevronLeftIcon } from "@heroicons/react/solid";


export default function UserDetails() {
  let navigate = useNavigate();
  let location = useLocation();

  const { values, setFieldValue, validateForm, setTouched, errors } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const patientRelationships = [
    { key: "dependant", value: "Dependant" },
    { key: "other", value: "Other" },
  ];
  const nextStep = "/select-time";

  const validateEmptyFields = () => {
    if (values.firstName === "" && values.lastName === "") {
      return true;
    }
  };

  useEffect(() => {
    loadPageSchema(location.pathname);
  }, []);

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <Form>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full">
          <button className="align-self-start" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-8 h-8" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-extrabold mb-8">Your details</h1>

          <InputField name="firstName" label="First name" required={true}/>
          <InputField name="lastName" label="Last name" required={true}/>
          <BirthdateField
            name="birthDate"
            label="Date of birth"
            mask={dateOfBirthMask}
          />
          <InputField name="email" label="Email" required={true}/>

          {values.isAppointmentForYou.toLowerCase() === "no" ? (
            <SelectField
              name="patientRelationship"
              label="Relatonship with patient"
              options={patientRelationships}
            />
          ): null}

          <button
            className={buttonStyles}
            onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
            // disabled={(errors.firstName || errors.lastName || validateEmptyFields()) ? true : false}
            // onClick={() => {
            //   navigate("/select-time");
            // }}
          >
            Next
          </button>
        </div>
      </Form>
    </div>
  );
}