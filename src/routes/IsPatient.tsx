import React, { useState, useEffect } from "react";
import RadioGroup from "../components/RadioGroup";
import SelectField from "../components/SelectField";
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
import SelectFieldCustom from "../components/SelectFieldCustom";


export default function IsPatient() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { loadPageSchema, currentSchema } = useSchemaContext();
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const reasons = "/reasons";
  // const userDetails = "/user-details";
  // const patientDetails = "/patient-details";

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
    loadPageSchema(location.pathname, values.isAppointmentForYou.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.isAppointmentForYou]);

  const options = [{ key: "yes", value: "Me" }, { key: "no", value: "Someone else" }];

  const primaryBtnStyles = "flex mt-14 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-72 disabled:bg-gray-300 self-center lg:w-36";

  const buttonStyles = "flex mr-3 justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300";
  
  return (
    <div className="relative bg-figGray-300">
      <div className="w-full p-4 h-16 bg-white"></div>

      <Modal handleIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}>
        <div className="text-left">
          <p className="text-lg font-bold font-Montserrat text-figOrange-500">What's a discovery call?</p>
          <p className="text-base leading-5 my-3 font-Montserrat text-black">This is an opportunity for our care delivery team to learn about you and match you with the right dietitian.</p>
          <p className="text-base leading-5 mt-3 mb-6 font-Montserrat text-black">This is an opportunity for our care delivery team to learn about you and match you with the right dietitian.</p>

          <div className="mt-4 px-5 pt-5 pb-5 bg-figGray-100 flex flex-col items-start border-t-4 border-t-figOrange-700">
            <p className="mb-3 font-Montserrat font-bold text-2xl text-figOrange-700">1.</p>
            <p className="font-Montserrat text-sm text-figGray-600">Share your health concerns and your reason for reaching out.</p>
          </div>

          <div className="mt-4 px-5 pt-5 pb-5 bg-figGray-100 flex flex-col items-start border-t-4 border-t-figOrange-700">
            <p className="mb-3 font-Montserrat font-bold text-2xl text-figOrange-700">2.</p>
            <p className="font-Montserrat text-sm text-figGray-600">Learn about our team at Culina and work with your Care Coordinator to find the best match for you.</p>
          </div>

          <div className="mt-4 px-5 pt-5 pb-5 bg-figGray-100 flex flex-col items-start border-t-4 border-t-figOrange-700">
            <p className="mb-3 font-Montserrat font-bold text-2xl text-figOrange-700">3.</p>
            <p className="font-Montserrat text-sm text-figGray-600">Have the opportunity to ask any other questions about the way we work.</p>
          </div>

        </div>
      </Modal>

      <div className="h-screen bg-gray-100 flex flex-col justify-start py-5 px-5 md:mt-12 lg:px-8 lg:mt-16">

        {/* Info Window */}
        <div className="flex justify-between items-center bg-white border-2 border-figOrange-700 p-4 mb-4 mt-0">
          <div className="pr-8">
            <p className="font-bold font-Montserrat text-figOrange-700">What's a discovery call?</p>
            <p className="text-sm text-black font-Montserrat">There is no cost associated with discovery calls.</p>
          </div>
          <button className="self-start" onClick={() => setIsModalVisible(true)}>
            <InformationCircleIcon className="w-8 h-8 self-start text-figOrange-700" />
          </button>
        </div>

        {/* White area */}
        <div className="bg-white sm:mx-auto lg:mx-0 sm:w-full sm:max-w-2xl flex flex-col justify-between items-center h-fit lg:h-[600px]">
          <div className="flex flex-col py-20 px-16">
            <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">Step 1 of 5</p>
            <h1 className="text-3xl font-extrabold mb-7">Let's book your discovery call!</h1>

            <p className="xs:hidden md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:mx-auto">Tell us, what's the reason for your visit?</p>
            {/* <RadioGroup
              name="isAppointmentForYou"
              label="Appointment"
              options={options}
              align="horizontal"
            /> */}
            {/* <SelectField
              name="isAppointmentForYou"
              label="The appointment is for"
              options={options}
            /> */}
            <SelectFieldCustom
              name="isAppointmentForYou"
              label="Reason for visit"
              options={options}
            />
            <SelectFieldCustom
              name="isAppointmentForYou"
              label="The appointment is for"
              options={options}
            />
            <button
              className={primaryBtnStyles}
              // disabled={setButtonState()}
              onClick={() => {
                handleNav({ nextStep: reasons, validateForm, setTouched, navigate, currentSchema });
                // if (values.isAppointmentForYou.toLowerCase() === "yes") {
                //   handleNav({ nextStep: userDetails, validateForm, setTouched, navigate, currentSchema });
                // } else {
                //   handleNav({ nextStep: patientDetails, validateForm, setTouched, navigate, currentSchema });
                // }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}