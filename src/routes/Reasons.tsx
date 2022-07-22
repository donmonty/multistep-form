import React, { useState, useEffect } from "react";
import { CheckboxSingle } from "../components/Checkbox";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import { handleNav } from "../lib/utils";
import { FormData } from "../types";
import avocados from "../images/avocados.png";


export default function IsPatient() {

  let navigate = useNavigate();
  let location = useLocation();

  const { loadPageSchema, currentSchema } = useSchemaContext();
  const { values, setFieldValue, validateForm, setTouched } = useFormikContext<FormData>();
  const userDetails = "/user-details";

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

  // const options = [{ key: "yes", value: "me" }, { key: "no", value: "someone else" }];
  const buttonStyles = "flex mt-16 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-72 disabled:bg-gray-300 self-center lg:self-end lg:w-36";

  const secondaryBtnStyles = "lg:flex mt-16 mr-3 lg:justify-center py-3 px-4 border-2 border-figOrange-700 text-sm font-Montserrat font-bold text-figOrange-700 tracking-widest bg-white w-72 lg:w-36";
  
  return (
    <div className="bg-figGray-300">
      <div className="w-full p-4 h-16 bg-white"></div>
      <div
        className="h-screen flex justify-center py-5 px-2 md:mt-12 lg:px-8 lg:mt-16"
        style={{
          backgroundImage: `url(${avocados})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className="xs:hidden lg:flex lg:justify-center lg:items-center lg:h-[600px] lg:min-w-[430px] lg:max-w-[430px] lg:pl-16 lg:pr-16 text-4xl font-Osaka font-bold bg-white/50">
          Now, let's learn about your primary reasons for visit.
        </div>

        <div className="bg-white/50 sm:mx-auto lg:mx-0 sm:w-full sm:max-w-2xl flex flex-col justify-between items-center h-fit lg:h-[600px] lg:bg-white">
          <div className="flex flex-col py-9 px-16">
            <p className="pl-2 mb-2 font-CapriSans text-figGray-600 lg:text-xl">Step 1 of 5</p>
            <h1 className="text-3xl font-extrabold pl-2 mb-4 lg:hidden">Now, let's learn about your primary reasons for visit.</h1>
            <p className="pl-2 mb-8 font-CapriSans text-black tracking-widest lg:mx-auto">Select all that apply</p>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 lg:grid-cols-3 place-items-stretch">
              <CheckboxSingle
                name="healthyEating"
                label="Healthy Eating" 
              />
              <CheckboxSingle
                name="weightManagement"
                label="Weight Management" 
              />
              <CheckboxSingle
                name="heartHealth"
                label="Heart Health" 
              />
              <CheckboxSingle
                name="hormonalDisorders"
                label="Hormonal & Autoimmune Disorders" 
              />
              <CheckboxSingle
                name="diabetes"
                label="Diabetes & Pre-Diabetes" 
              />
              <CheckboxSingle
                name="fertilityNutrition"
                label="Fertitlity & Pre & Postpartum Nutrition" 
              />
              <CheckboxSingle
                name="sportsNutrition"
                label="Sports Nutrition" 
              />
              <CheckboxSingle
                name="foodAllergies"
                label="Autoimmune & Food Allergies" 
              />
              <CheckboxSingle
                name="relationshipFood"
                label="Relationship With Food" 
              />
              <CheckboxSingle
                name="oncology"
                label="Oncology" 
              />
              <CheckboxSingle
                name="gutLiverKidney"
                label="Gut, Liver & Kidney Health" 
              />
              <CheckboxSingle
                name="otherReason"
                label="Other" 
              />
            </div>        

            <div className="flex self-center lg:self-end">
              <button className={`${secondaryBtnStyles} xs:hidden`} onClick={() => navigate(-1)}>BACK</button>
              <button
                className={buttonStyles}
                // disabled={setButtonState()}
                onClick={() => {
                  handleNav({ nextStep: userDetails, validateForm, setTouched, navigate, currentSchema });
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}