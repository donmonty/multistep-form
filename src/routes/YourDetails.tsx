import React, { useEffect } from "react";

import InputField from "../components/InputField";

import { useNavigate, useLocation } from "react-router-dom";

import { useFormikContext } from "formik";
import { useSchemaContext } from "../components/SchemaContext";
import SelectFieldCustom from "../components/SelectFieldCustom";
import { FormData } from "../types";
import { handleNav } from "../lib/utils";
import Header from "../components/Header";
import ImageCouple from "../images/image-couple.png";

import { dateOfBirthMask } from "../components/masks";
import BirthdateField from "../components/BirthdateField";

const states = [
  { key: "CA", value: "CA" },
  { key: "AZ", value: "AZ" },
  { key: "TX", value: "TX" },
];

export default function YourDetails() {
  let navigate = useNavigate();
  let location = useLocation();

  const { validateForm, setTouched, values } = useFormikContext<FormData>();
  const { loadPageSchema, currentSchema } = useSchemaContext();
  const nextStep =
    values.isAppointmentForYou.toLowerCase() === "me"
      ? "/select-time"
      : "/patient-details";

  useEffect(() => {
    loadPageSchema(location.pathname, values.isAppointmentForYou.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryBtnStyles =
    "flex mt-0 lg:mt-0 justify-center py-3 px-4 border-2 border-figOrange-700 shadow-sm text-sm font-Montserrat font-semibold text-white tracking-widest bg-figOrange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full disabled:bg-gray-300 self-center";

  return (
    <div className="relative bg-figGray-300 h-fit md:h-screen">
      <Header />
      <div className="h-full bg-image-couple lg:h-fit bg-figGray-300 flex flex-col justify-start py-5 px-5 md:mt-4 lg:px-8 lg:pb-0 lg:flex-row lg:justify-left">
        {/* White area */}
        <div className="bg-white lg:mt-16 lg:mb-16 min-h-[500px] lg:min-w-[720px] lg:max-w-[720px] form-content">
          <div className="flex flex-col pt-14  px-10 lg:pt-12 lg:pb-12 lg:px-20">
            <p className="mb-5 font-CapriSans text-figGray-600 lg:text-xl">
              Step 2 of 5
            </p>
            <h1 className="text-4xl tracking-wide font-Playfair font-semibold mb-7">
              Your details
            </h1>
            <p className="md:inline-block mb-8 font-CapriSans text-black tracking-widest lg:ml-0">
              Please give us a few details about you.
            </p>

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-6 place-items-stretch">
              <div className="md:col-span-3">
                <InputField
                  name="firstName"
                  label="First name"
                  required={true}
                />
              </div>

              <div className="md:col-span-3">
                <InputField name="lastName" label="Last name" required={true} />
              </div>

              <div className="md:col-span-3">
                <BirthdateField
                  name="birthDate"
                  label="Date of birth"
                  mask={dateOfBirthMask}
                />
              </div>

              <div className="md:col-span-3">
                <InputField name="email" label="Email" required={true} />
              </div>

              <div className="md:col-span-6">
                <InputField name="street" label="Street" required={true} />
              </div>

              <div className="md:col-span-2">
                <InputField name="city" label="City" required={true} />
              </div>

              <div className="md:col-span-2">
                <SelectFieldCustom
                  name="state"
                  label="State"
                  options={states}
                />
              </div>

              <div className="md:col-span-2">
                <InputField name="zipcode" label="Zip Code" required={true} />
              </div>

              <button
                className={`${primaryBtnStyles} md:col-span-6`}
                onClick={() =>
                  handleNav({
                    nextStep,
                    validateForm,
                    setTouched,
                    navigate,
                    currentSchema,
                  })
                }
              >
                NEXT
              </button>
            </div>
          </div>
          {/* Image container */}
          <div>
            <img className="image-couple" src={ImageCouple} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
