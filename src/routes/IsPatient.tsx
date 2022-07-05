import React, { useState, useEffect } from "react";
import RadioGroup from "../components/RadioGroup";
import { CheckboxSingle } from "../components/Checkbox";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { FormData } from "../types";


export default function IsPatient() {
  const [isAppointmentForUser, setIsAppointmentForUser] = useState<boolean>(true);

  let navigate = useNavigate();
  let location = useLocation();

  const { loadPageSchema, currentSchema } = useSchemaContext();
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const userDetails = "/user-details";
  const patientDetails = "/patient-details";

  const handleShowGoals = () => {
    if (values.isAppointmentForYou.toLowerCase() === "yes") {
      setFieldValue("weightloss", false);
      setFieldValue("sustainableHabits", false);
      setFieldValue("lowEnergy", false);
      setFieldValue("balancedDiet", false);
    }
    setIsAppointmentForUser(!isAppointmentForUser);
  }

  const setButtonState = () => {
    if (values.isAppointmentForYou === "yes") {
      if (
        !values.weightloss  &&
        !values.sustainableHabits &&
        !values.lowEnergy &&
        !values.balancedDiet
      ) {
        return true;
      }
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (values.isAppointmentForYou === "yes") {
      setIsAppointmentForUser(true);
    } else {
      setIsAppointmentForUser(false);
    }
  }, []);

  useEffect(() => {
    loadPageSchema(location.pathname, values.isAppointmentForYou.toLowerCase());
  }, [values.isAppointmentForYou]);

  const options = [{ key: "yes", value: "yes" }, { key: "no", value: "no" }];
  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";
  
  return (
    <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">Let's get you started!</h1>
          <h5 className="mb-4 mt-8 text-base text-gray-400">Is this appointment for you?</h5>
          <RadioGroup
            name="isAppointmentForYou"
            label="Appointment"
            options={options}
            align="horizontal"
            handleChange={handleShowGoals}
          />
          
          {isAppointmentForUser ? (
            <>
              <p className="mb-4 mt-8 text-sm font-bold">Now let's learn about your primary goals with Culina Health. Select all that apply:</p>
              <div className="mb-6">
                <CheckboxSingle
                  name="weightloss"
                  label="Weightloss" 
                />
                <CheckboxSingle
                  name="sustainableHabits"
                  label="Learn sustainable habits" 
                />
                <CheckboxSingle
                  name="lowEnergy"
                  label="My energy feels low" 
                />
                <CheckboxSingle
                  name="balancedDiet"
                  label="Have a balanced diet" 
                />
              </div>
            </>
          ): null}
        </div>
        <button
          className={buttonStyles}
          // disabled={setButtonState()}
          onClick={() => {
            if (values.isAppointmentForYou.toLowerCase() === "yes") {
              handleNav({ nextStep: userDetails, validateForm, setTouched, navigate, currentSchema });
            } else {
              handleNav({ nextStep: patientDetails, validateForm, setTouched, navigate, currentSchema });
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}