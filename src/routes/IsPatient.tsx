import React, { useState, useEffect } from "react";
import SelectFieldCustom from "../components/SelectFieldCustom";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Modal from "react-modal";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { FormData } from "../types";



export default function IsPatient() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let navigate = useNavigate();
  let location = useLocation();

  const { loadPageSchema, currentSchema } = useSchemaContext();
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const reasons = "/user-details";
  // const userDetails = "/user-details";
  // const patientDetails = "/patient-details";

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  Modal.setAppElement('#root');

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
  const reasonOptions = [
    { key: "healthyEating", value: "Healthy Eating" },
    { key: "weightManagement", value: "Weight Management" },
    { key: "heartHealth", value: "Heart Health" },
    { key: "hormonalDisorders", value: "Hormonal & Autoimmune Disorders"},
    { key: "diabetes", value: "Diabetes & Pre-Diabetes" },
    { key: "fertilityNutrition", value: "Fertitlity & Pre & Post-Partum Nutrition" },
    { key: "sportsNutrition", value: "Sports Nutrition" },
    { key: "foodAllergies", value: "Autoimmune & Food Allergies" },
    { key: "relationshipFood", value: "Relationship With Food" },
    { key: "oncology", value: "Oncology" },
    { key: "gutLiverKidney", value: "Gut, Liver & Kidney Health" },
    { key: "otherReason", value: "Other" },
  ];

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
  
  return (
    <div className="relative bg-figGray-300 h-screen">
      <div className="w-full p-4 h-16 bg-white"></div>

      <Modal
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
          },
          content: {
            // position: "relative",
            borderWidth: "4px",
            borderColor: "#E74D33",
            padding: "2.5rem"
          }
        }}
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
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

          <div className='w-72 mt-5 mb-5 mx-auto'>
            <button
              onClick={closeModal}
              className={primaryBtnStyles}
            >
              Ok
            </button>
          </div>

        </div>

      </Modal>
      
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-12 lg:px-8 lg:pb-0 lg:mt-16 lg:flex-row lg:justify-center">

        {/* Serious man container (large displays) */}
        <div className="lg:flex lg:flex-col lg:justify-end serious-man-full lg:min-h-[640px]">
          <div className="lg:ml-16 lg:pb-5">
            {/* Info Window */}
            <div className="flex justify-between items-center bg-white border-2 border-figOrange-700 p-4 mb-4 lg:w-[490px] lg:mr-5 mt-0">
              <div className="pr-8">
                <p className="font-bold font-Montserrat text-figOrange-700">What's a discovery call?</p>
                <p className="text-sm text-black font-Montserrat">There is no cost associated with discovery calls.</p>
              </div>
              <button className="self-start" onClick={openModal}>
                <InformationCircleIcon className="w-8 h-8 self-start text-figOrange-700" />
              </button>
            </div>
          </div>
        </div>

        {/* White area */}
        <div
          id="serious-man"
          className="bg-white sm:mx-auto lg:mx-0 sm:w-full sm:max-w-2xl flex flex-col justify-between lg:items-stretch h-fit lg:h-fit lg:max-w-[630px] serious-man-xs serious-man-md serious-man-lg"
          // style={{
          //   backgroundImage: `url(${blackMan})`,
          //   backgroundRepeat: "no-repeat",
          //   // backgroundSize: "cover",
          //   backgroundSize: "65% auto",
          //   backgroundPosition: "right",
          // }}
        >
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
            <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">Step 1 of 5</p>
            <h1 className="text-4xl font-extrabold mb-7">Let's book your discovery call!</h1>

            <p className="xs:hidden md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:mx-auto">Tell us, what's the reason for your visit?</p>
            
            <SelectFieldCustom
              name="reasonForVisit"
              label="Reason for visit"
              options={reasonOptions}
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