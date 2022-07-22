import React, { useState, useEffect } from "react";
import RadioGroup from "../components/RadioGroup";
import { CheckboxSingle } from "../components/Checkbox";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Modal from "../components/Modal";

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { loadPageSchema, currentSchema } = useSchemaContext();
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const userDetails = "/user-details";
  const patientDetails = "/patient-details";

  const handleShowGoals = (e: any) => {
    if (values.isAppointmentForYou.toLowerCase() === "me") {
      setFieldValue("weightloss", false);
      setFieldValue("sustainableHabits", false);
      setFieldValue("lowEnergy", false);
      setFieldValue("balancedDiet", false);
    }
    if (e.target.value === "me") {
      setIsAppointmentForUser(true);
    } else {
      setIsAppointmentForUser(false);
    }
    // setIsAppointmentForUser(!isAppointmentForUser);
  }

  // const setButtonState = () => {
  //   if (values.isAppointmentForYou === "yes") {
  //     if (
  //       !values.weightloss  &&
  //       !values.sustainableHabits &&
  //       !values.lowEnergy &&
  //       !values.balancedDiet
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }
  //   return false;
  // };

  useEffect(() => {
    if (values.isAppointmentForYou === "me") {
      setIsAppointmentForUser(true);
    } else {
      setIsAppointmentForUser(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadPageSchema(location.pathname, values.isAppointmentForYou.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.isAppointmentForYou]);

  const options = [{ key: "yes", value: "me" }, { key: "no", value: "someone else" }];
  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";
  
  return (
    <div className="relative">
      <Modal handleIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}>
        <div className="py-4 text-center">
          <p className="text-lg font-bold">What's a discovery call?</p>
          <p className="text-sm my-3">This is an opportunity for our care delivery team to learnabout you and match you with the right dietitian.</p>
        </div>
      </Modal>
      <div className="h-screen bg-gray-100 flex justify-center py-12 px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md min-h-full flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Let's book your discovery call</h1>

            <div className="flex justify-between items-center bg-slate-200 rounded-xl p-4 my-4">
              <div>
                <p className="font-bold text-indigo-600">What's a discovery call?</p>
                <p className="text-sm text-slate-600">There is no cost associated with discovery calls.</p>
              </div>
              <button onClick={() => setIsModalVisible(true)}>
                <InformationCircleIcon className="w-8 h-8 self-start text-indigo-600" />
              </button>
            </div>

            <h5 className="mb-4 mt-8 text-base text-gray-400">Who are you booking this appointment for?</h5>
            <RadioGroup
              name="isAppointmentForYou"
              label="Appointment"
              options={options}
              align="horizontal"
              handleChange={handleShowGoals}
            />
            
            {isAppointmentForUser ? (
              <>
                <p className="mb-6 mt-8 text-sm font-bold">Now let's learn about your primary goals with Culina Health. Select all that apply:</p>
                <div className="grid grid-cols-2 gap-2 place-items-stretch">
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
    </div>
  );
}