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
import SelectFieldCustom from "../components/SelectFieldCustom";
import { handleNav } from "../lib/utils";

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

  const primaryBtnStyles = "flex mt-10 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-bold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  useEffect(() => {
    loadPageSchema(location.pathname, values.isPolicyHolder.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.isPolicyHolder]);

  return (
    <div className="relative bg-figGray-300 h-fit lg:h-screen">
      <div className="w-full p-4 h-16 bg-white"></div>
      <div className="h-full lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-center">

        {/* Image container */}
        <div className="lg:flex lg:flex-col lg:justify-end insurance-card-lg lg:min-h-[640px] lg:min-w-[420px]"></div>

        {/* White area */}
        <div className="bg-white min-h-[500px]">
          <div className="flex flex-col py-10 px-10 lg:py-12 lg:px-16">
          <p className="pl-2 mb-5 font-CapriSans text-figGray-600 lg:text-xl">step 3 of 5</p>
          <h1 className="text-4xl font-extrabold mb-7">Insurance Information</h1>

          <p className="xs:hidden md:inline-block pl-2 mb-8 font-CapriSans text-black tracking-widest lg:ml-0">Are you the pooicy holder?</p>

          <RadioGroup
            name="isPolicyHolder"
            label="Are you the policy holder?"
            align="horizontal"
            options={isPolicyHolder}
            handleChange={handlePolicyHolderVisible}
          />

          {/* Form fields */}
          <div>

            {isPolicyHolderVisible ? (
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 lg:grid-cols-8 lg:gap-x-2 place-items-stretch">

                <div className="w-full pb-2 mb-2 border-b-2 border-figGray-300 lg:col-span-8">
                  <p className="text-xl font-bold">About the Policy Holder</p>
                </div>

                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderFirstName"
                    label="Policy holder's first name"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderLastName"
                    label="Policy holder's last name"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-3">
                  <BirthdateField
                    name="policyHolderBirthDate"
                    label="Policy holder's DOB"
                    mask={dateOfBirthMask}
                  />
                </div>
                <div className="lg:col-span-5">
                  <InputField
                    name="policyHolderAddress"
                    label="Policy holder's address"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-4">
                  <InputField
                    name="policyHolderCity"
                    label="City"
                    required={true}
                  />
                </div>
                <div className="lg:col-span-2">
                  <SelectFieldCustom
                    name="policyHolderState"
                    label="State"
                    options={states}
                  />
                </div>
                <div className="lg:col-span-2">
                  <InputField
                    name="policyHolderZip"
                    label="Zip"
                    required={true}
                  />
                </div>
              </div>
            ): null}

            <button
              className={`${primaryBtnStyles} lg:col-span-8 lg:mt-2`}
              onClick={() => handleNav({ nextStep, validateForm, setTouched, navigate, currentSchema })}
            >
              Next
            </button>

          </div>

          </div>
        </div>

      </div>
    </div>
  );
}